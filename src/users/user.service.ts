import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { CreateUserDTO } from "./dto/createuser.dto";
import * as bcrypt from 'bcrypt';

@Injectable()

export class UserService {

constructor ( @InjectModel(User.name) private UserModel: Model<User>){}

async createUser(userDto: CreateUserDTO){

    const emailExist = await this.UserModel.findOne({email:userDto.email});
    if (emailExist){
        throw new ConflictException('email já em uso');
    }
        //hash senha e define o numero de salt rounds(quanto maior mais seguro porem lento)
    const hashsenha = await bcrypt.hash(userDto.senha, 10)

    const newUser = new this.UserModel({
        ...userDto,
        senha: hashsenha,
    });

    await newUser.save();
    
    //.toObject() converte o documento Mongoose em um objeto JavaScript simples 
    const userObject = newUser.toObject();

    //(userObject as any) diz para o TypeScript para ignorar a checagem de tipo
    //porque o compilador reclama que senha não é opcional e não pode ser deletada diretamente
    delete (userObject as any).senha;

    return userObject;

}

}