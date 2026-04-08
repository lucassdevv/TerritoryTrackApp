import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTerritoryRecordDto } from './dto/create-territory-record.dto';
import { UpdateTerritoryRecordDto } from './dto/update-territory-record.dto';
import { S13ReportQueryDto } from './dto/s13-report.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { format } from 'date-fns';

@Injectable()
export class TerritoryRecordService {
  constructor(private prisma: PrismaService) {}

  /**
   * Helper function to format a Date assuming its UTC components are the intended ones.
   * This bypasses the default Local timezone offset that shifts Midnight UTC dates back 1 day.
   */
  private formatDateUTC(d: Date, formatStr: string) {
    const localDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    return format(localDate, formatStr);
  }

  /**
   * Generate data for the S-13 Territory Assignment Record.
   * Groups territory records by territoryNumber, chunks assignments in groups of 4,
   * and calculates the "última fecha en que se completó" for each territory.
   */
  async getS13Report(query: S13ReportQueryDto) {
    // Determine the service year boundaries (Sep 1 - Aug 31)
    const now = new Date();
    let serviceYear = query.serviceYear;
    if (!serviceYear) {
      // The Service Year takes the name of the year it ends in.
      // e.g., October 2025 (month 9) → service year 2026 (Sep 1 2025 - Aug 31 2026)
      // April 2026 (month 3) → service year 2026 (Sep 1 2025 - Aug 31 2026)
      serviceYear = now.getMonth() >= 8 ? now.getFullYear() + 1 : now.getFullYear();
    }

    // If service year is 2026, start is Sep 1 2025, end is Aug 31 2026
    const startDate = new Date(serviceYear - 1, 8, 1); // September 1
    const endDate = new Date(serviceYear, 7, 31, 23, 59, 59); // August 31

    // Fetch all records within the service year, ordered by territory and assignment date
    const records = await this.prisma.territoryRecord.findMany({
      where: {
        dateAssigned: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        territory: true,
        publisher: true,
      },
      orderBy: [
        { territory: { territoryNumber: 'asc' } },
        { dateAssigned: 'asc' },
      ],
    });

    // For "última fecha completada", also fetch the most recent completion BEFORE the service year
    const previousCompletions = await this.prisma.territoryRecord.findMany({
      where: {
        dateCompleted: {
          not: null,
          lt: startDate,
        },
      },
      include: {
        territory: true,
      },
      orderBy: {
        dateCompleted: 'desc',
      },
    });

    // Build a map: territoryNumber -> latest completion date before this service year
    const previousCompletionMap = new Map<number, Date>();
    for (const rec of previousCompletions) {
      const tNum = rec.territory.territoryNumber;
      if (!previousCompletionMap.has(tNum) && rec.dateCompleted) {
        previousCompletionMap.set(tNum, rec.dateCompleted);
      }
    }

    // Group records by territory number
    const grouped = new Map<number, typeof records>();
    for (const record of records) {
      const tNum = record.territory.territoryNumber;
      if (!grouped.has(tNum)) {
        grouped.set(tNum, []);
      }
      grouped.get(tNum)!.push(record);
    }

    // Also include territories that have NO records this year (empty rows)
    const allTerritories = await this.prisma.territory.findMany({
      orderBy: { territoryNumber: 'asc' },
    });

    // Build the response: for each territory, chunk assignments in groups of 4
    const territories = allTerritories.map((territory) => {
      const tNum = territory.territoryNumber;
      const territoryRecords = grouped.get(tNum) || [];

      const assignments = territoryRecords.map((r) => ({
        publisherName: `${r.publisher.name} ${r.publisher.lastName}`,
        dateAssigned: this.formatDateUTC(r.dateAssigned, 'dd/MM/yy'),
        dateCompleted: r.dateCompleted
          ? this.formatDateUTC(r.dateCompleted, 'dd/MM/yy')
          : null,
      }));

    // Calculate the absolute latest completion date for this territory
      let maxCompletedDate: Date | null = null;
      if (previousCompletionMap.has(tNum)) {
        maxCompletedDate = previousCompletionMap.get(tNum)!;
      }
      for (const r of territoryRecords) {
        if (r.dateCompleted) {
          if (!maxCompletedDate || r.dateCompleted > maxCompletedDate) {
            maxCompletedDate = r.dateCompleted;
          }
        }
      }

      const formattedMaxDate = maxCompletedDate ? this.formatDateUTC(maxCompletedDate, 'dd/MM/yy') : null;

      // Chunk into groups of 4
      const rows: {
        territoryNumber: number;
        lastCompletedDate: string | null;
        assignments: typeof assignments;
      }[] = [];

      if (assignments.length === 0) {
        // Even if no assignments, include one empty row for the territory
        rows.push({
          territoryNumber: tNum,
          lastCompletedDate: formattedMaxDate,
          assignments: [],
        });
      } else {
        for (let i = 0; i < assignments.length; i += 4) {
          const chunk = assignments.slice(i, i + 4);
          
          rows.push({
            territoryNumber: tNum,
            lastCompletedDate: formattedMaxDate, 
            assignments: chunk,
          });
        }
      }

      return rows;
    });

    // Flatten all territory rows into a single array
    const allRows = territories.flat();

    return {
      serviceYear,
      serviceYearLabel: `${serviceYear}`,
      rows: allRows,
    };
  }
  async create(createTerritoryRecordDto: CreateTerritoryRecordDto) {
    const { territoryNumber, allBlocksCompleted, blocksId, ...recordData } = createTerritoryRecordDto;

    const territory = await this.prisma.territory.findUnique({
      where: { territoryNumber }
    });

    if (!territory) {
      throw new NotFoundException(`No se encontró el territorio ${territoryNumber}`);
    }

    return this.prisma.$transaction(async (tx) => {
      const dateCompletedFlag = allBlocksCompleted ? new Date(recordData.dateWorked) : null;

      const record = await tx.territoryRecord.create({
        data: {
          ...recordData,
          dateAssigned: new Date(recordData.dateAssigned),
          dateWorked: new Date(recordData.dateWorked),
          territoryId: territory.id,
          dateCompleted: dateCompletedFlag
        }
      });

      let blocksToCreate: number[];
      if (allBlocksCompleted) {
        const allblocks = await tx.block.findMany({
          where: { territoryId: territory.id }
        });
        blocksToCreate = allblocks.map(b => b.id);
      } else {
        blocksToCreate = blocksId || [];
      }

      if (blocksToCreate.length > 0) {
        await tx.blockRecord.createMany({
          data: blocksToCreate.map(blockId => ({
            blockId: blockId,
            territoryRecordId: record.id
          }))
        });
      }

      return record;
    });
  }

  async findAll() {
    const records = await this.prisma.territoryRecord.findMany({
      include: {
        territory: true,
        publisher: true,
        outingPlace: true,
        blockRecords: { include: { block: true } }
      },
      orderBy: { dateWorked: 'desc' }
    });

    return records.map(r => this.formatRecord(r));
  }

  async findOne(id: number) {
    const territoryRecord = await this.prisma.territoryRecord.findUnique({
      where: { id },
      include: {
        territory: true,
        publisher: true,
        outingPlace: true,
        blockRecords: { include: { block: true } }
      }
    });

    if (!territoryRecord) {
      throw new NotFoundException(`Registro de territorio con el id ${id} no encontrado!`);
    }

    return this.formatRecord(territoryRecord);
  }

  async findByTerritory(territoryNumber: number) {
    const territory = await this.prisma.territory.findUnique({
      where: { territoryNumber }
    });

    if (!territory) return [];

    const records = await this.prisma.territoryRecord.findMany({
      where: { territoryId: territory.id },
      include: {
        publisher: true,
        outingPlace: true,
        territory: true,
        blockRecords: { include: { block: true } }
      },
      orderBy: { dateWorked: 'desc' }
    });

    return records.map(r => this.formatRecord(r));
  }

  async update(id: number, dto: UpdateTerritoryRecordDto) {
    await this.findOne(id);

    return this.prisma.territoryRecord.update({
      where: { id },
      data: dto
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.territoryRecord.delete({
      where: { id }
    });
  }

  private formatRecord(r: any) {
    return {
      ...r,
      allBlocksCompleted: !!r.dateCompleted,
      dateAssigned: this.formatDateUTC(r.dateAssigned, 'dd/MM/yyyy'),
      dateWorked: this.formatDateUTC(r.dateWorked, 'dd/MM/yyyy'),
      dateCompleted: r.dateCompleted ? this.formatDateUTC(r.dateCompleted, 'dd/MM/yyyy') : null
    };
  }
}
