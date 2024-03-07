import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApartamentController } from './apartament/apartament.controller';
import { ApartamentModule } from './apartament/apartament.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ApartamentModule,
  ],
  controllers: [AppController, ApartamentController],
  providers: [],
})
export class AppModule {}
