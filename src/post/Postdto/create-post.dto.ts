import { IsArray, IsEnum, IsNotEmpty, IsObject, IsString, MaxLength } from "class-validator";
import { PostTag } from "src/enums/post-tag.enum";

export class CreatePostDTO {

@IsString()
@IsNotEmpty()
@MaxLength(80)
titulo: string;

@IsString()
@IsNotEmpty()
@MaxLength(1000)
conteudo: string;

@IsArray()
//each: true para validar item por item
@IsEnum(PostTag,{ each: true })
tags: PostTag[];

}