import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ApartmentDocument = Apartment & Document;

@Schema()
export class Apartment {
  @Prop()
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  isEmpty: boolean;
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);