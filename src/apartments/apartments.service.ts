import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Apartments } from './schemas/apartments.schemas';
import { Model } from 'mongoose';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectModel('Apartment')
    private readonly apartmentModel: Model<Apartments>,
  ) {}

  async getEmptyApartmentsCount(): Promise<number> {
    return this.apartmentModel.countDocuments({ isBooked: false }).exec();
  }
}
