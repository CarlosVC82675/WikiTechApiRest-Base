import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
        throw new Error('JWT_SECRET não está definido no .env');
    }
    super({
        // Extrai o token do header Authorization do tipo Bearer
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // A chave secreta usada para validar o token
        secretOrKey: secret,
        ignoreExpiration: false,
    });
  }

  // O método validate é chamado automaticamente após a validação do token
  async validate(payload: any) {
  
    return {
      userId: payload.sub,
      username: payload.nomeDeUsuario,
      role: payload.role,
    };
  }
}