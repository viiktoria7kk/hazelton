import { Module } from '@nestjs/common';
import { ApartamentService } from './apartament.service';
import { ApartamentController } from './apartament.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ApartmentSchema } from './schemas/apartment.schema';

@Module({
  controllers: [ApartamentController],
  providers: [ApartamentService],
  imports: [
    MongooseModule.forFeature([{ name: 'Apartment', schema: ApartmentSchema }]),
  ],
})
export class ApartamentModule {}
