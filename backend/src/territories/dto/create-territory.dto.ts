import { IsEnum, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";
import { TerritoryType } from "@prisma/client";

export class CreateTerritoryDto {
    @IsInt()
    @IsPositive()
    territoryNumber: number;

    @IsString()
    @IsNotEmpty()
    mapColor: string;

    @IsEnum(TerritoryType)
    @IsNotEmpty()
    territoryType: TerritoryType;
}
