import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDTO } from './dto/singin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/model/user.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @Post('/registration')
  registration(@Body() userDto: User) {
    return this.authService.registration(userDto);
  }
}
