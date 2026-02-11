import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


//este sera el encargado de crear una instancia singleton de prisma service para compartir a travez de toda la app

@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
