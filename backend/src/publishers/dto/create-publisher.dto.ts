import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreatePublisherDto {
  @IsInt()
  @IsPositive()
  idRole: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
