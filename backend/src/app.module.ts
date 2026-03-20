import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { TerritoryRecordModule } from './territory-record/territory-record.module';
import { TerritoriesModule } from './territories/territories.module';
import { PublishersModule } from './publishers/publishers.module';
import { OutingPlacesModule } from './outing-places/outing-places.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ConfigModule nos ayuda a poner .env de manera global.
    PrismaModule,
    TerritoryRecordModule,
    TerritoriesModule,
    PublishersModule,
    OutingPlacesModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
