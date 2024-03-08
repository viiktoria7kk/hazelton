import { Controller, Get } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Get()
  async getAvailableApartmentsCount(): Promise<number> {
    return this.apartmentsService.getAvailableApartmentsCount();
  }
}
