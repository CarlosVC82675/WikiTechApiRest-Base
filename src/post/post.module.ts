import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "src/schemas/post.schema";
import { PostService } from "./post.service";


@Module({

imports: [
    MongooseModule.forFeature([
        {
            name: Post.name,
            schema: PostSchema,
        },
    ])
],
providers: [
    PostService,
],

controllers: [],

exports: [],

})

export class PostModule{}
