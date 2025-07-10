import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "src/users/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()

export class AuthService {


constructor (
    @InjectModel(User.name) private UserModel: Model<User>,
    private userService: UserService,
    private jwtService: JwtService, 
){}

async login(login: LoginDto){

    const user = await this.userService.findbyEmail(login.email);

    if (!user) {
    //exceção padrão do Nest que retorna 401 Unauthorized
    throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaOk = await bcrypt.compare(login.senha, user.senha);
    if (!senhaOk) {
    throw new UnauthorizedException('Credenciais inválidas');
    }

    //criando o conteudo de um token
    const payload = {
        //subject
        sub: user._id,
        //role do usuario
        role: user.role,
    }

    //criando um token, pegue o payload, assine e codifique
      const token = this.jwtService.sign(payload);

      // 4. Retornar o token para o front com os dados do usuário 
    return {
    access_token: token,
    user: {
      id: user._id,
      nomeDeUsuario: user.nomeDeUsuario,
      email: user.email,
      role: user.role,
    },
  };

}



}