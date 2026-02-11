import { Module } from '@nestjs/common';
import { TerritoryRecordService } from './territory-record.service';
import { TerritoryRecordController } from './territory-record.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TerritoryRecordController],
  providers: [TerritoryRecordService],
  imports: [PrismaModule]
})
export class TerritoryRecordModule {}
