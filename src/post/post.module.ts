import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "src/schemas/post.schema";


@Module({

imports: [
    MongooseModule.forFeature([
        {
            name: Post.name,
            schema: PostSchema,
        },
    ])
],
providers: [],

controllers: [],

exports: [],

})

export class PostModule{}
