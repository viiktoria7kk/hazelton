import { ApiProperty } from '@nestjs/swagger';

export class CountAvailableApartmentsDto {
  @ApiProperty({ description: 'Count of available apartmens' })
  readonly count: number;
}
