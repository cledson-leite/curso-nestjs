import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/enum/roles';
export const ROLE_KEY = 'role';
export const Role = (...role: Roles[]) => SetMetadata(ROLE_KEY, role);
