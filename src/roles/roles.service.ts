import { Injectable } from '@nestjs/common';
import { CreateRoleDTO } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './model/roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async createRole(dto: CreateRoleDTO) {
    const role = new this.roleModel(dto);
    await role.save();
    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleModel.findOne({ value });
    return role;
  }
}
