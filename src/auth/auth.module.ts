import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/users/user.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";


@Module({

imports:[
   UserModule,
   //configurando e declarando a chave dos tokens
   JwtModule.register({
      secret: 'bungas',
      signOptions: { expiresIn: '1h' },
    }),
],


providers:[
    AuthService,   
    JwtStrategy,
],


controllers:[
    AuthController
],


})

export class AuthModule{}