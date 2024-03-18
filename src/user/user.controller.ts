import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';

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
  @Roles('admin')
  @UseGuards(RoleGuard)
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

  @ApiOperation({ summary: 'Add Role To User' })
  @ApiResponse({ status: 200, type: CreateUserDTO })
  @Post('add-role/:userId/:roleId')
  async addUserRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.userService.addUserRole(userId, roleId);
  }

  @ApiOperation({ summary: 'Remove Role From User' })
  @ApiResponse({ status: 200, type: CreateUserDTO })
  @Post('remove-role/:userId/:roleId')
  async removeUserRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.userService.removeUserRole(userId, roleId);
  }
}
