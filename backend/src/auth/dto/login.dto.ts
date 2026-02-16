import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{

    @IsString()
    @IsNotEmpty()
    id: string; //ese es id

    @IsString()
    @IsNotEmpty()
    password: string;

    
}