import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTerritoryRecordDto } from './dto/create-territory-record.dto';
import { UpdateTerritoryRecordDto } from './dto/update-territory-record.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { format } from 'date-fns';

@Injectable()
export class TerritoryRecordService {
  constructor(private prisma: PrismaService) {}

  async create(createTerritoryRecordDto: CreateTerritoryRecordDto) {
    
    const {territoryNumber, allBlocksCompleted, blocksId, ...recordData } = createTerritoryRecordDto
    
    const territory = await this.prisma.territory.findUnique({
      where: {territoryNumber}
    })

    if (!territory) {throw new NotFoundException(`no se encontro el territorio ${territoryNumber}`)}



    return this.prisma.$transaction(async (tx)=>{

      
      const dateCompletedFlag = allBlocksCompleted ? new Date(recordData.dateWorked) : null;

      const record = await tx.territoryRecord.create({
        data:{
          ...recordData,
          dateAssigned: new Date(recordData.dateAssigned),
          dateWorked: new Date(recordData.dateWorked),
          territoryId: territory.id,
          dateCompleted: dateCompletedFlag
        }
      })

      let blocksToCreate: number[]
      if (allBlocksCompleted){

        const allblocks = await tx.block.findMany({
          where:{territoryId: territory.id}
        })

        blocksToCreate = allblocks.map(b => b.id)
      } else{
        blocksToCreate = blocksId || []
      }

      if (blocksToCreate.length > 0){
        await tx.blockRecord.createMany({
          data: blocksToCreate.map(blockId => ({
            blockId: blockId,
            territoryRecordId: record.id
          }))
        })
      }

      return record

    })
  }



  async findAll() {
    const records = await this.prisma.territoryRecord.findMany({
      include: {territory:true, publisher:true, outingPlace:true, blockRecords: {include:{block:true}}},
      orderBy: { dateWorked: 'desc' }
    });

    //aqui formatearemos las fechas antes de mandarlas.
    return records.map(r =>({
      ...r,
      allBlocksCompleted: !!r.dateCompleted,
      dateAssigned: format(r.dateAssigned, 'dd/MM/yyyy'),
      dateWorked: format(r.dateWorked, 'dd/MM/yyyy'),
      dateCompleted: r.dateCompleted ? format(r.dateCompleted, 'dd/MM/yyyy') : null
    }));
  }

  async findOne(id: number) {
    const territoryRecord = await this.prisma.territoryRecord.findUnique({
      where: {id},
      include: {
        territory: true,
        publisher: true,
        outingPlace: true,
        blockRecords: { include: { block: true } }
      }
    })
    if(!territoryRecord) {
      throw new NotFoundException(`Registro de territorio con el id ${id} no se encontro!`)
    }
    return {
      ...territoryRecord,
      allBlocksCompleted: !!territoryRecord.dateCompleted,
      dateAssigned: format(territoryRecord.dateAssigned, 'dd/MM/yyyy'),
      dateWorked: format(territoryRecord.dateWorked, 'dd/MM/yyyy'),
      dateCompleted: territoryRecord.dateCompleted ? format(territoryRecord.dateCompleted, 'dd/MM/yyyy') : null
    }

  }

  async findByTerritory(territoryNumber: number){
    
    const territory = await this.prisma.territory.findUnique({
       where: { territoryNumber }
    });

    if(!territory) return [];

    const records = await this.prisma.territoryRecord.findMany({
      where: {territoryId: territory.id},
      include: {publisher: true, outingPlace: true, territory: true, blockRecords: { include: { block: true } }},
      orderBy: { dateWorked: 'desc' }
    })


    return records.map(r => ({
      ...r,
      allBlocksCompleted: !!r.dateCompleted,
      dateAssigned: format(r.dateAssigned, 'dd/MM/yyyy'),
      dateWorked: format(r.dateWorked, 'dd/MM/yyyy'),
      dateCompleted: r.dateCompleted ? format(r.dateCompleted,'dd/MM/yyyy') : null
    }))
  }


  async update(id: number, dto: UpdateTerritoryRecordDto){
    await this.findOne(id)

      
    return this.prisma.territoryRecord.update({
        where: {id},
        data: dto
      })
  }

  async remove(id: number){
    await this.findOne(id)

    return this.prisma.territoryRecord.delete({
      where: {id}
    })
  }



}
