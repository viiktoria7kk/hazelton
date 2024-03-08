import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ApartmentsDocument = Apartments & Document;

@Schema()
export class Apartments {
  @Prop()
  count: number;
}

export const ApartmentsSchema = SchemaFactory.createForClass(Apartments);