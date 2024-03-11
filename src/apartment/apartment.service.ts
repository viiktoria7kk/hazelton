import { Injectable } from '@nestjs/common';
import { Apartment } from './model/apartment.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectModel(Apartment.name) private apartmentModel: Model<Apartment>,
  ) {}

  async getAllApartments(): Promise<Apartment[]> {
    return this.apartmentModel.find().exec();
  }

  async getApartmentById(id: string): Promise<Apartment> {
    return this.apartmentModel.findById(id);
  }

  async createApartment(apartment: Apartment): Promise<Apartment> {
    const newApartment = new this.apartmentModel(apartment);
    return await newApartment.save();
  }

  async updateApartment(id: string, apartment: Apartment): Promise<Apartment> {
    return this.apartmentModel.findByIdAndUpdate(id, apartment, { new: true });
  }

  async deleteApartment(id: string): Promise<Apartment> {
    return this.apartmentModel.findByIdAndDelete(id);
  }
}
