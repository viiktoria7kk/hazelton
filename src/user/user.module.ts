import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user.model';
import { RoleSchema } from 'src/roles/model/roles.model';
import { UserRolesSchema } from 'src/roles/model/user-roles.model';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Role', schema: RoleSchema },
      // { name: 'UserRoles', schema: UserRolesSchema },
    ]),
  ],
  providers: [UserService],
})
export class UserModule {}
