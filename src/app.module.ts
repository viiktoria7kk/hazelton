import { Module } from '@nestjs/common';
import { ApartmentModule } from './apartment/apartment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ApartmentsModule } from './apartments/apartments.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { UserSchema } from './user/model/user.model';
import { UserRolesSchema } from './roles/model/user-roles.model';
import { RoleSchema } from './roles/model/roles.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Role', schema: RoleSchema },
      // { name: 'UserRoles', schema: UserRolesSchema },
    ]),
    ApartmentModule,
    ApartmentsModule,
    AuthModule,
    UserModule,
    RolesModule,
  ],
  providers: [UserService],
})
export class AppModule {}
