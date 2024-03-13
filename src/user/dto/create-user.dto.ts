import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'example', description: 'The user username' })
  readonly username: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'The user email' })
  readonly email: string;

  @ApiProperty({ example: 'scdm$smck3343', description: 'The user password' })
  readonly password: string;

  @ApiProperty({ example: 'admin', description: 'The user role' })
  readonly role: string;
}
