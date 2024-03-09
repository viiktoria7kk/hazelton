import { Module } from '@nestjs/common';
import { ApartmentModule } from './apartment/apartment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ApartmentsModule } from './apartments/apartments.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ApartmentModule,
    ApartmentsModule,
    AuthModule,
    UserModule,
  ],
  providers: [UserService],
})
export class AppModule {}
