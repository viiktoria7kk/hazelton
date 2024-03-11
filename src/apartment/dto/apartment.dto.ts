import { ApiProperty } from '@nestjs/swagger';

export class ApartmentDTO {
  readonly id: string;

  @ApiProperty({ example: 'room', description: 'Apartment`s name' })
  readonly name: string;

  @ApiProperty({
    example: 'true',
    description: 'Is apartment available or not',
  })
  readonly isAvailable: boolean;
}
