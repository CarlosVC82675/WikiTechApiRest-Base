import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard'; 
import { Roles } from 'src/auth/role.decorator';
import { CurrentUser } from 'src/auth/current-user.decorator'; 
import { UserRole } from 'src/enums/user-role.enum';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

@Controller('perfil')
export class PerfilController {

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUsuario(@CurrentUser() user: JwtPayload) {
    return user; // dados do usuário logado
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin-area')
  paginaAdmin() {
    return 'Pagina do admin';
  }
}