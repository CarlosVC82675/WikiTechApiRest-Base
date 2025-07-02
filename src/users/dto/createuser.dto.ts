import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";
import { UserRole } from "src/enums/user-role.enum";

export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    @MaxLength(68)
    nomeDeUsuario: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MaxLength(14)
    @MinLength(8)
    senha: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @IsOptional()
    @IsString()
    @MaxLength(600)
    bio?: string;

    @IsOptional()
    @IsUrl()
    avatar?: string;


}