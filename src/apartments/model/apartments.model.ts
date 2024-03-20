import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';

export type ApartmentsDocument = Apartments & Document;

@Schema()
export class Apartments {
  @IsNumber()
  @Prop()
  count: number;
}

export const ApartmentsSchema = SchemaFactory.createForClass(Apartments);
