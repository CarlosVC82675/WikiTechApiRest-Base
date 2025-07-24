
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { mongo, Types } from "mongoose";


@Schema({timestamps: true})
export class Comment{

@Prop({required: true})
conteudo: string;

@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true})
autor: Types.ObjectId;

@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true})
post: Types.ObjectId;

//basicamente essa propriedade parentComment define a qual comentario pai esse comentario pertence
// assim podemos ter que cada comentario pode pertencer a um pai e o pai pode ter varios filhos

@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null})
comentariopai?: Types.ObjectId;



}

export const CommentSchema = SchemaFactory.createForClass(Comment);