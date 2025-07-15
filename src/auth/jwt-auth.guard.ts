import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()

//verifica se o JWT está presente e válido, como ja tem um padrao no nestj a gente so faz importar
//Ele usa as regras do jwt strategy
export class JwtAuthGuard extends AuthGuard('jwt') {}