import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserRolesDocument = UserRoles & Document;

@Schema()
export class UserRoles {
  @Prop()
  id: string;

  @Prop()
  roleId: string;

  @Prop()
  userId: string;
}

export const UserRolesSchema = SchemaFactory.createForClass(UserRoles);
