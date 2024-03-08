import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { Apartment } from './schemas/apartment.schema';
import { ApartmentDTO } from './dto/apartment.dto';

@Controller('apartment')
export class ApartamentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Get()
  async getAllApartments(): Promise<Apartment[]> {
    return this.apartmentService.getAllApartments();
  }

  @Get(':id')
  async getApartmentById(@Param('id') id: string): Promise<Apartment> {
    return this.apartmentService.getApartmentById(id);
  }

  @Post()
  async createApartment(
    @Body() createApartment: ApartmentDTO,
  ): Promise<Apartment> {
    return this.apartmentService.createApartment(createApartment);
  }

  @Put(':id')
  async updateApartment(
    @Param('id') id: string,
    @Body() updateApartment: ApartmentDTO,
  ): Promise<Apartment> {
    return this.apartmentService.updateApartment(id, updateApartment);
  }

  @Delete(':id')
  async deleteApartment(@Param('id') id: string): Promise<Apartment> {
    return this.apartmentService.deleteApartment(id);
  }
}
