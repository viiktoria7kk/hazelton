import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { Role } from 'src/roles/model/roles.model';

export class CreateUserDTO {
  @IsString()
  @ApiProperty({ example: 'example', description: 'The user username' })
  readonly username: string;

  @IsEmail()
  @ApiProperty({ example: 'example@gmail.com', description: 'The user email' })
  readonly email: string;

  @IsString()
  @ApiProperty({ example: 'scdm$smck3343', description: 'The user password' })
  readonly password: string;

  @IsString()
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

  @IsBoolean()
  @ApiProperty({ default: false, description: 'The user banned status' })
  @Prop({ default: false })
  readonly banned: boolean;
}
