import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class S13ReportQueryDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  serviceYear?: number;
}
