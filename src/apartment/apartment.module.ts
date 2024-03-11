import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartamentController } from './apartment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ApartmentSchema } from './model/apartment.model';

@Module({
  controllers: [ApartamentController],
  providers: [ApartmentService],
  imports: [
    MongooseModule.forFeature([{ name: 'Apartment', schema: ApartmentSchema }]),
  ],
})
export class ApartmentModule {}
