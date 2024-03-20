import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { Apartment } from './model/apartment.model';
import { ApartmentDTO } from './dto/apartment.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth.decorator';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';

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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Apartment' })
  @ApiResponse({ status: 200, type: Apartment })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Post()
  async createApartment(
    @Body() createApartment: ApartmentDTO,
  ): Promise<Apartment> {
    return this.apartmentService.createApartment(createApartment);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Apartment by id' })
  @ApiResponse({ status: 200, type: Apartment })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Put(':id')
  async updateApartment(
    @Param('id') id: string,
    @Body() updateApartment: ApartmentDTO,
  ): Promise<Apartment> {
    return this.apartmentService.updateApartment(id, updateApartment);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Apartmeent by id' })
  @ApiResponse({ status: 200, type: Apartment })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Delete(':id')
  async deleteApartment(@Param('id') id: string): Promise<Apartment> {
    return this.apartmentService.deleteApartment(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reserve Apartment' })
  @ApiResponse({ status: 200, type: Apartment })
  @UseGuards(JwtAuthGuard)
  @Post('reserve/:id')
  async reserveApartment(@Param('id') id: string): Promise<Apartment> {
    return this.apartmentService.reserveApartment(id);
  }
}
