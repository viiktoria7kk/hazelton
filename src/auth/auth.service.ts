import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDTO) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDTO) {
    try {
      const candidate = await this.userService.getByEmail(userDto.email);
      if (candidate) {
        throw new UnauthorizedException('User with this email already exists');
      }
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      const user = await this.userService.createUser({
        ...userDto,
        password: hashPassword,
      });
      return this.generateToken(user);
    } catch (error) {
      throw error;
    }
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles ? user.roles.map((role) => role.role) : ['user'],
      secret: process.env.SECRET,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDTO) {
    const user = await this.userService.getByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException('Incorrect email or password');
  }
}
