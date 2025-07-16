
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

@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null})
comentariopai?: Types.ObjectId;



}

export const CommentSchema = SchemaFactory.createForClass(Comment);