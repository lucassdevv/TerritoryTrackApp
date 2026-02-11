import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TerritoryRecordModule } from './territory-record/territory-record.module';
import { TerritoriesModule } from './territories/territories.module';
import { PublishersModule } from './publishers/publishers.module';
import { OutingPlacesModule } from './outing-places/outing-places.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ConfigModule nos ayuda a poner .env de manera global.
    PrismaModule,
    TerritoryRecordModule,
    TerritoriesModule,
    PublishersModule,
    OutingPlacesModule
  ]
})
export class AppModule { }
