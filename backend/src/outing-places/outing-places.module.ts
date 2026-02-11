import { Module } from '@nestjs/common';
import { OutingPlacesService } from './outing-places.service';
import { OutingPlacesController } from './outing-places.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [OutingPlacesController],
  providers: [OutingPlacesService],
  imports: [PrismaModule]
})
export class OutingPlacesModule {}
