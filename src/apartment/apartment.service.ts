import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Apartment } from './model/apartment.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectModel(Apartment.name) private apartmentModel: Model<Apartment>,
  ) {}

  async getAllApartments(): Promise<Apartment[]> {
    try {
      return this.apartmentModel.find().exec();
    } catch (error) {
      throw new HttpException(
        `Error while get all apartments ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getApartmentById(id: string): Promise<Apartment> {
    try {
      return this.apartmentModel.findById(id);
    } catch (error) {
      throw new HttpException(
        `Error while get apartment by id ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createApartment(apartment: Apartment): Promise<Apartment> {
    try {
      const newApartment = new this.apartmentModel(apartment);
      return await newApartment.save();
    } catch (error) {
      throw new HttpException(
        `Error while create apartment  ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateApartment(id: string, apartment: Apartment): Promise<Apartment> {
    try {
      return this.apartmentModel.findByIdAndUpdate(id, apartment, {
        new: true,
      });
    } catch (error) {
      throw new HttpException(
        `Error while update apartment  ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteApartment(id: string): Promise<Apartment> {
    try {
      return this.apartmentModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(
        `Error while delete apartment  ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async reserveApartment(id: string): Promise<Apartment> {
    try {
      const updatedApartment = await this.apartmentModel.findByIdAndUpdate(
        id,
        { reserved: true },
        { new: true },
      );

      if (!updatedApartment) {
        throw new HttpException('Apartment not found', HttpStatus.NOT_FOUND);
      }

      return updatedApartment;
    } catch (error) {
      throw new HttpException(
        `Error while reserving apartment: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
