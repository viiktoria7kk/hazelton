import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ApartmentDocument = Apartment & Document;

@Schema()
export class Apartment {
  @ApiProperty()
  @Prop()
  id: string;

  @ApiProperty({
    required: true,
    description: 'The apartment name',
    example: 'Apartment 1',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    required: true,
    description: 'The apartment description',
    example: 'This is the first apartment',
  })
  @Prop({ required: true })
  isAvailable: boolean;
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
