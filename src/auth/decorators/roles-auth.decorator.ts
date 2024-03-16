import { SetMetadata } from '@nestjs/common';
import { RoleName } from 'src/roles/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleName[]) => SetMetadata(ROLES_KEY, roles);
