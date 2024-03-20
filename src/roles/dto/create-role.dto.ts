import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDTO {
  @IsString()
  @ApiProperty({ example: 'ADMIN', description: 'The role name' })
  readonly role: string;

  @IsString()
  @ApiProperty({
    example: 'This is the admin role',
    description: 'The role description',
  })
  readonly description: string;
}
