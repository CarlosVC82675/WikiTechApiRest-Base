import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateCommentDTO } from "./ComDTO/create-comment.dto";
import { CurrentUser } from "src/auth/current-user.decorator";
import { JwtPayload } from "src/auth/jwt-payload.interface";


@Controller('comment')

export class CommentController{

constructor(private readonly commentsService: CommentService){}

@UseGuards(JwtAuthGuard)
@Post(':postid')
async createComment(@Param('postid') postId: string, @Body() dto: CreateCommentDTO, @CurrentUser() user: JwtPayload){

    return this.commentsService.createComment(dto, user.sub, postId);

}

@Get('post/:postId')
 async getCommentsByPost(@Param('postId') postId: string) {
    return this.commentsService.getCommentsPost(postId);
  }

}