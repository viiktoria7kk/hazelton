import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDTO } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './model/roles.model';
import { User } from 'src/user/model/user.model';
import { get } from 'http';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  async createRole(dto: CreateRoleDTO): Promise<Role> {
    try {
      const role = await this.roleModel.create({
        role: dto.role,
        description: dto.description,
      });
      return role;
    } catch (error) {
      throw new HttpException(
        `Error while creating role: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addUserRole(userId: string, roleId: string): Promise<User> {
    try {
      const role = await this.roleModel.findById(roleId);
      const roleName = role.role;

      const user = await this.userModel.findByIdAndUpdate(
        userId,
        {
          $addToSet: { roles: { role: roleName } },
        },
        { new: true },
      );
      return user;
    } catch (error) {
      throw new HttpException(
        `Error while add user role: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addDefaultUserRole(user: User): Promise<User> {
    try {
      const role = await this.getRoleByValue('user');
      if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }
      user.roles.push(role.id);
      await user.save();
      return user;
    } catch (error) {
      throw new HttpException(
        `Error while add default role: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllRoles(): Promise<Role[]> {
    try {
      const roles = await this.roleModel.find().exec();
      return roles;
    } catch (error) {
      throw new HttpException(
        `Error while get all roles: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getRoleByValue(value: string): Promise<Role | null> {
    try {
      const role = await this.roleModel.findOne({ role: value }).exec();
      if (!role) {
        return null;
      }
      return role;
    } catch (error) {
      throw new HttpException(
        `Error while getting role: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeUserRole(userId: string, roleId: string): Promise<User> {
    try {
      await this.userModel.findOneAndUpdate(
        { _id: userId },
        { $pull: { roles: { _id: roleId } } },
        { new: true },
      );
      const user = await this.userModel.findById(userId);
      return user;
    } catch (error) {
      throw new HttpException(
        `Error removing role: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
