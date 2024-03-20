import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role extends Document {
  @IsString()
  @ApiProperty({ example: 'admin', description: 'The role name' })
  @Prop({ default: 'user' })
  role: string;

  @IsString()
  @ApiProperty({
    example: 'This is the admin role',
    description: 'The role description',
  })
  @Prop({ default: 'role description' })
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
