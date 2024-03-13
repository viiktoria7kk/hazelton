import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = Auth & Document;

@Schema()
export class Auth {
  @ApiProperty()
  @Prop()
  id: string;

  @ApiProperty({
    required: true,
    description: 'The user name',
    example: 'John Doe',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    required: true,
    description: 'The user password',
    example: 'scdm$smck3343',
  })
  @Prop({ required: true })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
