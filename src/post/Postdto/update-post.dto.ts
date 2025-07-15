import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { PostTag } from "src/enums/post-tag.enum";

export class UpdatePostDTO {

@IsString()
@IsOptional()
titulo?: string;

@IsString()
@IsOptional()
conteudo?: string;

@IsArray()
@IsOptional()
//each: true para validar item por item
@IsEnum(PostTag,{ each: true })
tags?: PostTag[];



}