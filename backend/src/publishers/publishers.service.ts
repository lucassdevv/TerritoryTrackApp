import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublishersService {
  constructor(private prisma: PrismaService){}

  create(createPublisherDto: CreatePublisherDto) {
    return 'This action adds a new publisher';
  }

  async findAll() {
    return this.prisma.publisher.findMany({
      orderBy: {name: 'asc'}
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} publisher`;
  }

  update(id: number, updatePublisherDto: UpdatePublisherDto) {
    return `This action updates a #${id} publisher`;
  }

  remove(id: number) {
    return `This action removes a #${id} publisher`;
  }
}
