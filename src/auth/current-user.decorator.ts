import { createParamDecorator, ExecutionContext } from '@nestjs/common';


//criar um decorador personalidado que permite acessar facilmente o usuário autenticado dentro de um controller.
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Definido pelo JwtStrategy
  },
);

