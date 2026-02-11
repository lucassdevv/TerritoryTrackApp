import { Module } from '@nestjs/common';
import { TerritoriesService } from './territories.service';
import { TerritoriesController } from './territories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TerritoriesController],
  providers: [TerritoriesService],
  imports: [PrismaModule]
})
export class TerritoriesModule {
}
