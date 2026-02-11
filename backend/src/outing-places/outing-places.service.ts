import { Injectable } from '@nestjs/common';
import { CreateOutingPlaceDto } from './dto/create-outing-place.dto';
import { UpdateOutingPlaceDto } from './dto/update-outing-place.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OutingPlacesService {
  constructor (private prisma: PrismaService){}
  create(createOutingPlaceDto: CreateOutingPlaceDto) {
    return 'This action adds a new outingPlace';
  }

  async findAll() {
    return this.prisma.outingPlace.findMany({
      select: {
        id:true,
        familyName:true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} outingPlace`;
  }

  update(id: number, updateOutingPlaceDto: UpdateOutingPlaceDto) {
    return `This action updates a #${id} outingPlace`;
  }

  remove(id: number) {
    return `This action removes a #${id} outingPlace`;
  }
}
