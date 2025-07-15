import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post } from "src/schemas/post.schema";
import { CreatePostDTO } from "./Postdto/create-post.dto";
import { UpdatePostDTO } from "./Postdto/update-post.dto";


@Injectable()

export class PostService {

    constructor(@InjectModel(Post.name) private PostModel: Model<Post>  ){}

    async createPost(postdto: CreatePostDTO,  userId: string){

    const newPost = new this.PostModel({
        ...postdto,
    autor: userId,
    });
    await newPost.save();

    //Populate para mostrar os dados do autor
    const postObject = await newPost.populate({
        path: 'autor',
        select: 'nomeDeUsuario avatar role', // seleciona oque o populate vai buscar
    });
    // retorna na forma de um objeto java simples
    return postObject.toObject();

    }

    async listAllPosts(filters: { search?: string; tag?: string }) {

        //Cria e começa com uma query vazia, adiciona filtros se forem passados.
        const query: any = {};

        if (filters.search) {
            query.$or = [ // cria uma busca textual 
            { titulo: { $regex: filters.search, $options: 'i' } }, // flag i ignora maiúsculas/minúsculas (case-insensitive)
            { conteudo: { $regex: filters.search, $options: 'i' } },
            ];
        }

        if (filters.tag) {
            query.tags = filters.tag; //Filtra os posts que foram criados por tags
        }
        //Executa a consulta usando os filtros.
        return this.PostModel.find(query)
            .populate('autor', 'nomeDeUsuario avatar role')
            .exec();
    }

    async findAPost(id: string){
        const post = await this.PostModel.findById(id)
        .populate('autor', 'nomeDeUsuario avatar role') // só os campos que você quer expor
        .exec(); //executar a consulta e retornar uma Promise

        if (!post) {
        throw new NotFoundException('Post não encontrado');
        }

        return post;
    }

    async editPost(updatePost: UpdatePostDTO, id: string){
        const updated = await this.PostModel.findByIdAndUpdate(id,updatePost,{new:true})
        .populate('autor', 'nomeDeUsuario avatar role') 
        .exec();

         if (!updated) {
         throw new NotFoundException('Post não encontrado para atualizar');
         }

         return updated;
    }

    async deletePost(id:string){
        const deleted = await this.PostModel.findByIdAndDelete(id)
        if (!deleted) {
        throw new NotFoundException('Post não encontrado para deletar');
        }
        
    }

}