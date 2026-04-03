import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTerritoryDto } from './dto/create-territory.dto';
import { UpdateTerritoryDto } from './dto/update-territory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { subDays } from 'date-fns';

@Injectable()
export class TerritoriesService {
  constructor(private prisma: PrismaService){}

  async create(createTerritoryDto: CreateTerritoryDto) {
    return this.prisma.territory.create({
      data: createTerritoryDto
    });
  }

  async findAll() {
    return this.prisma.territory.findMany();
  }

  async findOneByTerritoryNumber(territoryNumber: number){
    const territory = await this.prisma.territory.findUnique({
      where: { territoryNumber },
      include: { blocks: true },
    });

    if (!territory) {
      throw new NotFoundException(`Territorio #${territoryNumber} no encontrado`);
    }

    return territory;
  }

  async findTerritoriresStatus(daysthreshold: number){
    const limitDay = subDays(new Date(), daysthreshold)

    const territories = await this.prisma.territory.findMany({
      include:{
        territoryRecords:{
          orderBy: {dateWorked: 'desc'},
          take: 1,
          include: { publisher: true }
        }
      }
    })

    return territories.map(territory =>{
      const lastRecord = territory.territoryRecords[0]
      
      let status: string

      if (!lastRecord){
        status = 'INDOCUMENTADO'
      } else if (lastRecord.dateCompleted === null) {
        status = 'INCOMPLETO'
      } else if (lastRecord.dateCompleted >= limitDay){
        status = 'COMPLETADO'
      } else {
        status = 'VENCIDO'
      }
      
      const assignedTo = lastRecord?.publisher ? `${lastRecord.publisher.name} ${lastRecord.publisher.lastName}` : 'No asignado';

      return{
        ...territory,
        status,
        assignedTo
      }
    })
  }

  async update(id: number, updateTerritoryDto: UpdateTerritoryDto) {
    // Nota: Aquí 'id' es el autoincremental de la DB
    const territory = await this.prisma.territory.findUnique({ where: { id } });
    if (!territory) throw new NotFoundException(`Territorio con ID ${id} no encontrado`);

    return this.prisma.territory.update({
      where: { id },
      data: updateTerritoryDto
    });
  }

  async remove(id: number) {
    const territory = await this.prisma.territory.findUnique({ where: { id } });
    if (!territory) throw new NotFoundException(`Territorio con ID ${id} no encontrado`);

    return this.prisma.territory.delete({
      where: { id }
    });
  }
}
