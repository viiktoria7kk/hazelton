import { Module } from '@nestjs/common';
import { ApartamentService } from './apartament.service';

@Module({
  providers: [ApartamentService]
})
export class ApartamentModule {}
