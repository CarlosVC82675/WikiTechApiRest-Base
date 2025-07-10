import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/enums/user-role.enum';

//decorator vai ser uusado para marcar uma rota ou controlador com os papéis (roles) permitidos.
//metadata será lida pelo RolesGuard para autorizar o acesso.
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);