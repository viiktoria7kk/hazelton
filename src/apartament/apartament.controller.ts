import { Controller, Get } from '@nestjs/common';

@Controller('apartament')
export class ApartamentController {
  @Get()
  getAll() {
    return 'all empty apartaments';
  }
}
