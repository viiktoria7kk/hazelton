import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private rolesService: RolesService,
  ) {}
  async addUserRole(userId: string, roleId: string): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        userId,
        {
          $pull: { roles: { role: 'user' } },
          $addToSet: { roles: { roleId } },
        },
        { new: true },
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async addDefaultUserRole(user: User): Promise<User> {
    try {
      const role = await this.rolesService.getRoleByValue('user');
      if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }
      user.roles.push(role.id);
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async removeUserRole(userId: string, roleId: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { roles: roleId } },
      { new: true },
    );
  }
  async createUser(dto: CreateUserDTO) {
    try {
      const user = await this.userModel.create(dto);
      await this.addDefaultUserRole(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    const users = await this.userModel.find();
    return users;
  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
