import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CountAvailableApartmentsDto {
  @IsNumber()
  @ApiProperty({ description: 'Count of available apartmens' })
  readonly count: number;
}
