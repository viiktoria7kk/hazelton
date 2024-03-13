import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: User) {
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
  }
  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, role: user.role, secret: process.env.SECRET};
    return {
      token: this.jwtService.sign(payload),
    };
  }
}