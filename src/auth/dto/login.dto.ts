import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";


export class LoginDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MaxLength(14)
    @MinLength(8)
    senha: string;    

}