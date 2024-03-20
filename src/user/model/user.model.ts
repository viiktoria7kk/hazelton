import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role } from 'src/roles/model/roles.model';

@Schema()
export class User extends Document {
  @IsString()
  @Prop()
  id: string;

  @IsString()
  @ApiProperty({
    required: true,
    description: 'The user username',
    example: 'John Doe',
  })
  @Prop({ required: true, unique: true })
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @ApiProperty({
    required: true,
    description: 'The user email address',
    example: 'example@gmail.com',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @IsString()
  @Length(4, 20)
  @ApiProperty({
    required: true,
    description: 'The user password',
    example: 'scdm$smck3343',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    default: [
      {
        role: 'user',
        description: 'user role',
      },
    ],
    description: 'The user roles',
  })
  @Prop({ type: [{ type: () => Role }] })
  roles: Role[];

  @ApiProperty({
    default: false,
    description: 'The user banned status',
  })
  @Prop({ default: false })
  banned: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
