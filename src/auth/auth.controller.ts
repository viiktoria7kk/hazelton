import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Return token' })
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() userDto: CreateUserDTO): Promise<{ token: string }> {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 200, description: 'Return token' })
  @HttpCode(HttpStatus.OK)
  @Post('/registration')
  async registration(
    @Body() userDto: CreateUserDTO,
  ): Promise<{ token: string }> {
    return this.authService.registration(userDto);
  }
}
