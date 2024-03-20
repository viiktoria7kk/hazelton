import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDTO } from './dto/create-role.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { Roles } from 'src/common/decorators/roles-auth.decorator';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { User } from 'src/user/model/user.model';
import { Role } from './model/roles.model';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Role' })
  @ApiResponse({ status: 200, type: CreateRoleDTO })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Post()
  async createRole(@Body() dto: CreateRoleDTO): Promise<Role> {
    return this.rolesService.createRole(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add Role To User' })
  @ApiResponse({ status: 200, type: CreateUserDTO })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Post('add-role/:userId/:roleId')
  async addUserRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ): Promise<User> {
    return this.rolesService.addUserRole(userId, roleId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get All Roles' })
  @ApiResponse({ status: 200, type: [CreateRoleDTO] })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.rolesService.getAllRoles();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Role By Value' })
  @ApiResponse({ status: 200, type: CreateRoleDTO })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('/:value')
  async getRoleByValue(@Param('value') value: string): Promise<Role> | null {
    return this.rolesService.getRoleByValue(value);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove User Role' })
  @ApiResponse({ status: 200, type: User })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Delete('remove-role/:userId/:roleId')
  async removeUserRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ): Promise<User> {
    return await this.rolesService.removeUserRole(userId, roleId);
  }
}
