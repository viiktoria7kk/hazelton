import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role } from 'src/roles/model/roles.model';

@Schema()
export class User extends Document {
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

  @Prop({ type: [{ type: () => Role }] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
