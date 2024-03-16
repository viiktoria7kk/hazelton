import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/model/roles.model';

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
        { $addToSet: { roles: { roleId } } }, // Передаємо об'єкт у поле roles
        { new: true }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async removeUserRole(userId: string, roleId: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, { $pull: { roles: roleId } }, { new: true });
  }

  async createUser(dto: CreateUserDTO) {
    try {
      const user = new this.userModel(dto);
      
      const roles: Role[] = dto.roles;
      
      user.roles = roles;
      
      await user.save();
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