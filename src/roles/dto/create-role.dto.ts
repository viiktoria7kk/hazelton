import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDTO {
  @ApiProperty({ example: 'ADMIN', description: 'The role name' })
  readonly role: string;

  @ApiProperty({
    example: 'This is the admin role',
    description: 'The role description',
  })
  readonly description: string;
}
