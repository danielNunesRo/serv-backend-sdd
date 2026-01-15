import { Request } from 'express';
import { Role } from '../service/enum/role.enum';


export interface RequestWithUser extends Request {
  user: {
    userId: number;
    email: string;
    role: Role;
  };
}