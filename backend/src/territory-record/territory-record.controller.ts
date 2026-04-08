import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { TerritoryRecordService } from './territory-record.service';
import { CreateTerritoryRecordDto } from './dto/create-territory-record.dto';
import { UpdateTerritoryRecordDto } from './dto/update-territory-record.dto';
import { S13ReportQueryDto } from './dto/s13-report.dto';

@Controller('territory-record')
export class TerritoryRecordController {
  constructor(private readonly territoryRecordService: TerritoryRecordService) {}

  @Post()
  create(@Body() createTerritoryRecordDto: CreateTerritoryRecordDto) {
    return this.territoryRecordService.create(createTerritoryRecordDto);
  }

  @Get('s13-report')
  getS13Report(@Query() query: S13ReportQueryDto) {
    return this.territoryRecordService.getS13Report(query);
  }

  @Get()
  findAll() {
    return this.territoryRecordService.findAll();
  }     

  @Get('byterritory')
  findByTerritory(@Query('territoryid', ParseIntPipe) territoryId: number){
    return this.territoryRecordService.findByTerritory(territoryId)
  }
  //    http://localhost:3000/territory-record/byterritory?territoryid=33

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.territoryRecordService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: number){
    return this.territoryRecordService.remove(+id)
  }

  @Patch('id')
  update(
  @Param('id', ParseIntPipe) id:number,
  @Body() dto: UpdateTerritoryRecordDto){
    return this.territoryRecordService.update(+id, dto)
  }

}
