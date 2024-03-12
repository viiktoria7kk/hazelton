import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleSchema } from './model/roles.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/model/user.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Role', schema: RoleSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  exports: [RolesService],
})
export class RolesModule {}
