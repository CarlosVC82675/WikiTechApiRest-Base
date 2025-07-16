import { Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Comment{




}

export const CommentSchema = SchemaFactory.createForClass(Comment);