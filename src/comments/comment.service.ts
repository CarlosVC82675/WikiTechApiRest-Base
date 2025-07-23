import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCommentDTO } from "./ComDTO/create-comment.dto";
import { Comment } from "src/schemas/comment.schema";


@Injectable()

export class CommentService{

    
constructor(@InjectModel(Comment.name) private CommentModel: Model<Comment>){}


async createComment(dto: CreateCommentDTO, userId: string, postId: string){

    const newComment = new this.CommentModel({
        autor: userId,
        post: postId,
        conteudo: dto.conteudo,
        comentariopai: dto.parentCommentId || null,  //ou o valor do dto ou nulo
    });

    await newComment.save();

    //retornando para o front

    await newComment.populate('autor', 'nomeDeUsuario');
    return newComment;

}

async getCommentsPost(postId: string){

    const comments = await this.CommentModel.find({post: postId})
    .populate('autor', 'nomeDeUsuario' )
    .lean();


    //montar arvore de comentarios: ESTUDO ISSO

    const commentMap = new Map();
    const roots: any[] = []; // ESTUDA ISSO

        // commentMap é um Map com todos os comentários indexados pelo seu _id
        // Adiciona a propriedade children em cada comentário para depois colocar os "filhos" dentro dos "pais".

        comments.forEach(comment => {
        (comment as any).children = [];  // cada comentário pode ter filhos/ ESTUDA ISSO
        commentMap.set(comment._id.toString(), comment); // salva no mapa com chave sendo o ID
        });

        // percorremos os mesmos comentários de novo.
        // se o comentário tem um pai (comentariopai), Procuramos o pai dentro do commentMap 
        // e Adicionamos esse comentário dentro da lista children do pai
        //Se não tem pai, é um comentário raiz , joga pro root

        comments.forEach(comment => {
            if (comment.comentariopai) {
            const parent = commentMap.get(comment.comentariopai.toString());
            if (parent) {
                parent.children.push(comment);  // adiciona como filho do pai correspondente
            }
            } else {
            roots.push(comment); // se não tem pai, é um comentário raiz
            }
        });

  return roots;

}






}