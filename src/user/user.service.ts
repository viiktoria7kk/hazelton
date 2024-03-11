import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(dto: CreateUserDTO) {
    const user = new this.userModel(dto);
    await user.save();
    return user;
  }

  async getAllUsers() {
    const users = await this.userModel.find();
    return users;
  }
}
