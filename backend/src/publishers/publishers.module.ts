import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PublishersController],
  providers: [PublishersService],
  imports: [PrismaModule]
})
export class PublishersModule {}
