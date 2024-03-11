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
import { Apartment } from './model/apartment.model';
import { ApartmentDTO } from './dto/apartment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('apartment')
@Controller('apartment')
export class ApartamentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @ApiOperation({ summary: 'Get All Apartmens' })
  @ApiResponse({ status: 200, type: [Apartment] })
  @Get()
  async getAllApartments(): Promise<Apartment[]> {
    return this.apartmentService.getAllApartments();
  }

  @ApiOperation({ summary: 'Get Apartmen By Id' })
  @ApiResponse({ status: 200, type: Apartment })
  @Get(':id')
  async getApartmentById(@Param('id') id: string): Promise<Apartment> {
    return this.apartmentService.getApartmentById(id);
  }

  @ApiOperation({ summary: 'Create Apartment' })
  @ApiResponse({ status: 200, type: Apartment })
  @Post()
  async createApartment(
    @Body() createApartment: ApartmentDTO,
  ): Promise<Apartment> {
    return this.apartmentService.createApartment(createApartment);
  }

  @ApiOperation({ summary: 'Update Apartment by id' })
  @ApiResponse({ status: 200, type: Apartment })
  @Put(':id')
  async updateApartment(
    @Param('id') id: string,
    @Body() updateApartment: ApartmentDTO,
  ): Promise<Apartment> {
    return this.apartmentService.updateApartment(id, updateApartment);
  }

  @ApiOperation({ summary: 'Delete Apartmeent by id' })
  @ApiResponse({ status: 200, type: Apartment })
  @Delete(':id')
  async deleteApartment(@Param('id') id: string): Promise<Apartment> {
    return this.apartmentService.deleteApartment(id);
  }
}
