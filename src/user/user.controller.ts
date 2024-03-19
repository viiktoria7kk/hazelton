import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { User } from './model/user.model';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async createUser(@Body() userDTO: CreateUserDTO): Promise<User> {
    return this.userService.createUser(userDTO);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get User By Username' })
  @ApiResponse({ status: 200, type: CreateUserDTO })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('username/:username')
  async getByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.getByUsername(username);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get User By Email' })
  @ApiResponse({ status: 200, type: CreateUserDTO })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('/:email')
  async getByEmail(@Param('email') email: string) {
    return this.userService.getByEmail(email);
  }
}
