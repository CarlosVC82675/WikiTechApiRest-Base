import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCommentDTO{

  @IsString()
  @IsNotEmpty()
  conteudo: string;

  @IsOptional()
  @IsString()
  parentCommentId?: string;

}