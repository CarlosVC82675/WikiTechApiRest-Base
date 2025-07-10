import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/users/user.module";
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from "./jwt.strategy";


@Module({

imports:[
   UserModule,
   //configurando e declarando a chave dos tokens
   JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        //vai ler do .env
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
            },
        }),
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