import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateTerritoryRecordDto {
    @IsInt()
    @IsPositive()
    territoryNumber: number;

    @IsInt()
    @IsPositive()
    publisherId: number;

    @IsInt()
    @IsPositive()
    outingPlaceId: number;

    @IsString()
    @IsNotEmpty()
    dateAssigned: string;

    @IsString()
    @IsNotEmpty()
    dateWorked: string;

    @IsBoolean()
    @IsNotEmpty()
    allBlocksCompleted: boolean;

    @IsArray()
    @IsOptional()
    @IsInt({each:true})    
    blocksId: number[];

    @IsString()
    @IsOptional()
    comment: string;

}



