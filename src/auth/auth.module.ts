import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "src/users/user.service";


@Module({

imports:[
    MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserSchema,
        },

    ])
],


providers:[
    AuthService,
    UserService
],


controllers:[
    AuthController
],


})

export class AuthModule{}