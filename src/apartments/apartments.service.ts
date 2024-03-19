import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Apartments } from './model/apartments.model';
import { Model } from 'mongoose';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectModel('Apartment')
    private readonly apartmentModel: Model<Apartments>,
  ) {}

  async getAvailableApartmentsCount(): Promise<number> {
    try {
      return this.apartmentModel.countDocuments({ isAvailable: true }).exec();
    } catch (error) {
      throw new HttpException(
        `Error while get count of available apartmns ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
