import { PartialType } from '@nestjs/mapped-types';
import { CreateTerritoryRecordDto } from './create-territory-record.dto';

export class UpdateTerritoryRecordDto extends PartialType(CreateTerritoryRecordDto) {
    
}
