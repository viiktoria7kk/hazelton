import { Injectable } from '@nestjs/common';
import { CreateRoleDTO } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './model/roles.model';
import { error } from 'console';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async createRole(dto: CreateRoleDTO): Promise<Role> {
    try {
      const role = await this.roleModel.create({
        role: dto.role,
        description: dto.description,
      });
      return role;
    } catch (error) {
      throw new Error(`Error while creating role: ${error.message}`);
    }
  }

  async getAllRoles(): Promise<Role[]> {
    try {
      const roles = await this.roleModel.find().exec();
      return roles;
    } catch (error) {
      throw new Error(`Error while fetching roles: ${error.message}`);
    }
  }

  async getRoleByValue(value: string): Promise<Role | null> {
    try {
      const role = await this.roleModel.findOne({ name: value }).exec();
      if (!role) {
        return null;
      }
      return role;
    } catch (error) {
      throw new Error(`Error while getting role: ${error.message}`);
    }
  }
}
