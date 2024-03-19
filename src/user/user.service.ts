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

  async createUser(dto: CreateUserDTO): Promise<User> {
    try {
      const user = await this.userModel.create(dto);
      await this.rolesService.addDefaultUserRole(user);
      return user;
    } catch (error) {
      throw new HttpException(
        `Error while create user: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (error) {
      throw new HttpException(
        `Error while get all users: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getByUsername(username: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ username });
      return user;
    } catch (error) {
      throw new HttpException(
        `Error while get user by username: ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email });
      return user;
    } catch (error) {
      throw new HttpException(
        `Error while get user by email: ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  
  async banUser(userId: string): Promise<User> {
    try {
      const user = await this.userModel.findById(userId);
      user.banned = true;
      return user.save();
    } catch (error) {
      throw new HttpException(
        `Error while ban user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
