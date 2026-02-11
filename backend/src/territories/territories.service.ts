import { Injectable } from '@nestjs/common';
import { CreateTerritoryDto } from './dto/create-territory.dto';
import { UpdateTerritoryDto } from './dto/update-territory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { subDays } from 'date-fns';

@Injectable()
export class TerritoriesService {
  constructor(private prisma: PrismaService){}

  create(createTerritoryDto: CreateTerritoryDto) {
    return 'This action adds a new territory';
  }

  async findAll() {
    return this.prisma.territory.findMany();
  }

  async findOne(id: number){
    return this.prisma.territory.findUnique({
      where: {id}
    })
  }

  async findTerritoriresStatus(daysthreshold: number){
    const limitDay = subDays(new Date(), daysthreshold)

    const territories = await this.prisma.territory.findMany({
      include:{
        territoryRecords:{
          orderBy: {dateWorked: 'desc'},
          take: 1
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

      return{
        ...territory,
        status
      }
    })
  }

}
