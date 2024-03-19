import { Controller, Get } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('apartments')
@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @ApiOperation({ summary: 'Get count of Available Apartmens' })
  @ApiResponse({ status: 200, type: Number })
  @Get()
  async getAvailableApartmentsCount(): Promise<number> {
    return this.apartmentsService.getAvailableApartmentsCount();
  }
}
