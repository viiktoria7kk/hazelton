import { Module } from '@nestjs/common';
import { ApartmentModule } from './apartment/apartment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ApartmentsModule } from './apartments/apartments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ApartmentModule,
    ApartmentsModule,
  ],
})
export class AppModule {}
