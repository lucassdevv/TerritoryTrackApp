import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OutingPlacesService } from './outing-places.service';
import { CreateOutingPlaceDto } from './dto/create-outing-place.dto';
import { UpdateOutingPlaceDto } from './dto/update-outing-place.dto';

@Controller('outing-places')
export class OutingPlacesController {
  constructor(private readonly outingPlacesService: OutingPlacesService) {}

  @Post()
  create(@Body() createOutingPlaceDto: CreateOutingPlaceDto) {
    return this.outingPlacesService.create(createOutingPlaceDto);
  }

  @Get()
  findAll() {
    return this.outingPlacesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outingPlacesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOutingPlaceDto: UpdateOutingPlaceDto) {
    return this.outingPlacesService.update(+id, updateOutingPlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outingPlacesService.remove(+id);
  }
}
