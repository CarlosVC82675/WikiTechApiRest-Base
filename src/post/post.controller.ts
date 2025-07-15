import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreatePostDTO } from "./Postdto/create-post.dto";
import { CurrentUser } from "src/auth/current-user.decorator";
import { JwtPayload } from "src/auth/jwt-payload.interface";
import mongoose from "mongoose";
import { UpdatePostDTO } from "./Postdto/update-post.dto";



@Controller('post')

export class PostController{

    constructor(private postService: PostService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPost(@Body() post:CreatePostDTO, @CurrentUser() user: JwtPayload){

        return this.postService.createPost(post,user.sub);
    }


    @UseGuards(JwtAuthGuard)
    @Get()
    async getPosts(
        @Query('search') search?: string, //parâmetros de busca, search para texto
        @Query('tag') tag?: string,  //para tag
        //parâmetros são capturados automaticamente via @Query() 
        ){
        
        return this.postService.listAllPosts({ search, tag });
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findPost(@Param('id')id: string){

        //verifico se o id passado é um objeto valido
        const isValid = mongoose.Types.ObjectId.isValid(id) // melhor em um middleware
        if(!isValid) throw new HttpException('post invalido', 404);

        return this.postService.findAPost(id);

    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async editPost(@Param('id')id:string, @Body() updatePost: UpdatePostDTO, @CurrentUser() user: JwtPayload,){

        const isValid = mongoose.Types.ObjectId.isValid(id) // melhor em um middleware
        if(!isValid) throw new HttpException('post invalido', 404);

        return this.postService.editPost(updatePost,id, user.sub);

    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletePost(@Param('id') id: string, @CurrentUser() user: JwtPayload,){

        const isValid = mongoose.Types.ObjectId.isValid(id) // melhor em um middleware
        if(!isValid) throw new HttpException('post invalido', 404);

        return this.postService.deletePost(id, user.sub, user.role);
    }





}
