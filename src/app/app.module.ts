import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/Wikitech'),
    UserModule, //Modulo user
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
