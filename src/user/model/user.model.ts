import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty()
  @Prop()
  id: string;

  @ApiProperty({
    required: true,
    description: 'The user username',
    example: 'John Doe',
  })
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty({
    required: true,
    description: 'The user email address',
    example: 'example@gmail.com',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    required: true,
    description: 'The user password',
    example: 'scdm$smck3343',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    required: true,
    description: 'The user role',
    example: 'admin',
  })
  @Prop({ default: 'user', required: false })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
