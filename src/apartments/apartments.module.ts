import { Module } from '@nestjs/common';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ApartmentsSchema } from './schemas/apartments.schemas';

@Module({
  controllers: [ApartmentsController],
  providers: [ApartmentsService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Apartment', schema: ApartmentsSchema },
    ]),
  ],
})
export class ApartmentsModule {}
