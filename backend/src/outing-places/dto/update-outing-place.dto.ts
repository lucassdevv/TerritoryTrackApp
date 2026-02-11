import { PartialType } from '@nestjs/mapped-types';
import { CreateOutingPlaceDto } from './create-outing-place.dto';

export class UpdateOutingPlaceDto extends PartialType(CreateOutingPlaceDto) {}
