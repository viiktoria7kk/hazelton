import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ApartmentDocument = Apartment & Document;

@Schema()
export class Apartment {
  @ApiProperty()
  @Prop()
  id: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  isAvailable: boolean;
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);