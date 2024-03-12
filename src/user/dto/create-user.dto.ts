import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'example', description: 'The user name' })
  readonly name: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'The user email' })
  readonly email: string;

  @ApiProperty({ example: 'scdm$smck3343', description: 'The user password' })
  readonly password: string;
}
