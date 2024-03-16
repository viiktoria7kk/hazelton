import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/model/roles.model';

export class CreateUserDTO {
  @ApiProperty({ example: 'example', description: 'The user username' })
  readonly username: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'The user email' })
  readonly email: string;

  @ApiProperty({ example: 'scdm$smck3343', description: 'The user password' })
  readonly password: string;

  @ApiProperty({
    default: [
      {
        role: 'user',
        description: 'user role',
      },
    ],
  })
  @Prop({
    type: [{ type: () => Role }],
    default: [
      {
        role: 'user',
        description: 'user role',
      },
    ],
  })
  roles: Role[];
}
