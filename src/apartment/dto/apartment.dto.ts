import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class ApartmentDTO {
  readonly id: string;

  @IsString()
  @ApiProperty({ example: 'room', description: 'Apartment`s name' })
  readonly name: string;

  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: 'Is apartment available or not',
  })
  readonly isAvailable: boolean;
}
