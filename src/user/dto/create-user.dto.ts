import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { Role } from 'src/roles/model/roles.model';

export class CreateUserDTO {
  @IsString()
  @ApiProperty({ example: 'example', description: 'The user username' })
  readonly username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @ApiProperty({ example: 'example@gmail.com', description: 'The user email' })
  readonly email: string;

  @IsString()
  @Length(4, 20)
  @ApiProperty({ example: 'scdm$smck3343', description: 'The user password' })
  readonly password: string;

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

  @Prop({ default: false })
  readonly banned: boolean;
}
