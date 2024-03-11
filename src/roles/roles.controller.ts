import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDTO } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Create Role' })
  @ApiResponse({ status: 200, type: CreateRoleDTO })
  @Post()
  create(@Body() dto: CreateRoleDTO) {
    return this.rolesService.createRole(dto);
  }

  @ApiOperation({ summary: 'Get Role By Value' })
  @ApiResponse({ status: 200, type: CreateRoleDTO })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
