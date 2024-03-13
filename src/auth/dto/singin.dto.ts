import { ApiProperty } from '@nestjs/swagger';

export class SingInDTO {
  @ApiProperty({ example: 'example', description: 'The user name' })
  readonly username: string;

  @ApiProperty({ example: 'scdm$smck3343', description: 'The user password' })
  readonly password: string;
}