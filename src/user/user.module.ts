import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user.model';
import { RoleSchema } from 'src/roles/model/roles.model';
import { UserService } from './user.service';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Role', schema: RoleSchema },
    ]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
