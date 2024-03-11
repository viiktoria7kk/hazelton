import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleSchema } from './model/roles.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/model/user.model';
import { UserRolesSchema } from './model/user-roles.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Role', schema: RoleSchema },
      { name: 'User', schema: UserSchema },
      // { name: 'UserRoles', schema: UserRolesSchema },
    ]),
  ],
})
export class RolesModule {}
