import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { PerfilModule } from 'src/perfil/perfil.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/Wikitech'),
    UserModule, //Modulo user
    AuthModule,
    PerfilModule,
    //tornando o ConfigModule acessivel
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
