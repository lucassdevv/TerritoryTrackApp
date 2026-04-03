import { IsNotEmpty, IsString } from "class-validator";

export class CreateOutingPlaceDto {
  @IsString()
  @IsNotEmpty()
  familyName: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
