import { UserRole } from 'src/enums/user-role.enum';

//interface para tipar dados dentro do token
export interface JwtPayload {
  sub: string;
  role: UserRole;
}