import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOutingPlaceDto } from './dto/create-outing-place.dto';
import { UpdateOutingPlaceDto } from './dto/update-outing-place.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OutingPlacesService {
  constructor(private prisma: PrismaService){}

  async create(createOutingPlaceDto: CreateOutingPlaceDto) {
    return this.prisma.outingPlace.create({
      data: createOutingPlaceDto
    });
  }

  async findAll() {
    return this.prisma.outingPlace.findMany({
      orderBy: { familyName: 'asc' }
    });
  }

  async findOne(id: number) {
    const outingPlace = await this.prisma.outingPlace.findUnique({
      where: { id }
    });

    if (!outingPlace) {
      throw new NotFoundException(`Lugar de salida #${id} no encontrado`);
    }

    return outingPlace;
  }

  async update(id: number, updateOutingPlaceDto: UpdateOutingPlaceDto) {
    await this.findOne(id);
    
    return this.prisma.outingPlace.update({
      where: { id },
      data: updateOutingPlaceDto
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    
    return this.prisma.outingPlace.delete({
      where: { id }
    });
  }
}
