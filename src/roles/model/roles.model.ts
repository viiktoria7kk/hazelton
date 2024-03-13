import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop()
  id: string;

  @ApiProperty({ example: 'admin', description: 'The role name' })
  @Prop({ required: true })
  role: string;

  @ApiProperty({
    example: 'This is the admin role',
    description: 'The role description',
  })
  @Prop()
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
