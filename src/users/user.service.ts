import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { CreateUserDTO } from "./dto/createuser.dto";


@Injectable()

export class UserService {

constructor ( @InjectModel(User.name) private UserModel: Model<User>){}

async createUser(userDto: CreateUserDTO){

    const newUser = new this.UserModel(userDto);
    await newUser.save();
    return newUser;

}

}