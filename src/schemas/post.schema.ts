
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { PostTag } from "src/enums/post-tag.enum";


@Schema({timestamps: true})
export class Post{

@Prop({required:true})    
titulo: string;

@Prop({required:true})
conteudo: string;

//Uma tag enum com varias tags [] array
@Prop({type: [String], enum:PostTag, default: []})
tags: PostTag[];

//Referencia de usuario em Post 
@Prop({type: mongoose.Schema.Types.ObjectId, ref:'User', required:true})
autor: Types.ObjectId;

// futuramente
//Likes: Types.ObjectId[];

}

export const PostSchema = SchemaFactory.createForClass(Post)