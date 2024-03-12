import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user.model';
import { RoleSchema } from 'src/roles/model/roles.model';
import { UserRolesSchema } from 'src/roles/model/user-roles.model';
import { UserService } from './user.service';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Role', schema: RoleSchema },
    ]),
    RolesModule,
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
