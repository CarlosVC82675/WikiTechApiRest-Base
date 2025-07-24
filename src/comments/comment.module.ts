import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "src/schemas/comment.schema";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";


@Module({

imports: [
    MongooseModule.forFeature([
        {
            name: Comment.name,
            schema: CommentSchema,

        }
    ])
],
providers:[
    CommentService,
],
controllers:[
    CommentController,
],
exports:[],


})

export class CommentModule{}