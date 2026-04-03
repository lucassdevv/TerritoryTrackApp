import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublishersService {
  constructor(private prisma: PrismaService){}

  async create(createPublisherDto: CreatePublisherDto) {
    return this.prisma.publisher.create({
      data: createPublisherDto
    });
  }

  async findAll() {
    return this.prisma.publisher.findMany({
      orderBy: { name: 'asc' },
      include: { role: true }
    });
  }

  async findOne(id: number) {
    const publisher = await this.prisma.publisher.findUnique({
      where: { id },
      include: { role: true }
    });
    
    if (!publisher) {
      throw new NotFoundException(`Publicador con ID #${id} no encontrado`);
    }
    
    return publisher;
  }

  async update(id: number, updatePublisherDto: UpdatePublisherDto) {
    await this.findOne(id);
    
    return this.prisma.publisher.update({
      where: { id },
      data: updatePublisherDto
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    
    return this.prisma.publisher.delete({
      where: { id }
    });
  }
}
