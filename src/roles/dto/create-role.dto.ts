import { ApiProperty } from "@nestjs/swagger";


export class CreateRoleDTO {
  @ApiProperty({ example: 'ADMIN', description: 'The role name' })
  readonly value: string;

  @ApiProperty({ example: 'This is the admin role', description: 'The role description' })
  readonly description: string;
}