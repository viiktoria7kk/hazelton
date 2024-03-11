import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);