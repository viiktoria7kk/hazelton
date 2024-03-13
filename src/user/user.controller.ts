import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, type: CreateUserDTO })
  @Post()
  create(@Body() userDTO: CreateUserDTO) {
    return this.userService.createUser(userDTO);
  }

  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: 200, type: [CreateUserDTO] })
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get User By Username' })
  @ApiResponse({ status: 200, type: CreateUserDTO })
  @Get('username/:username')
  async getByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @ApiOperation({ summary: 'Get User By Email' })
  @ApiResponse({ status: 200, type: CreateUserDTO })
  @Get('/:email')
  async getByEmail(@Param('email') email: string) {
    return this.userService.getByEmail(email);
  }
}
