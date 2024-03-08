import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApartamentController } from './apartament/apartament.controller';
import { ApartamentModule } from './apartament/apartament.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ApartmentsModule } from './apartments/apartments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ApartamentModule,
    ApartmentsModule,
  ],
  controllers: [AppController, ApartamentController],
  providers: [],
})
export class AppModule {}
