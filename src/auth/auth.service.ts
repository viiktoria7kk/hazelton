import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  async login(userDto: CreateUserDTO): Promise<{ token: string }> {
    try {
      const user = await this.validateUser(userDto);
      return this.generateToken(user);
    } catch (error) {
      throw new HttpException(
        `Error while login: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async registration(userDto: CreateUserDTO): Promise<{ token: string }> {
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
      throw new HttpException(
        `Error while registration: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async generateToken(user: User): Promise<{ token: string }> {
    try {
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles ? user.roles.map((role) => role.role) : ['user'],
        banned: user.banned,
        secret: process.env.SECRET,
      };
      return {
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new HttpException(
        `Error while generating token: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async validateUser(userDto: CreateUserDTO): Promise<User> {
    try {
      const user = await this.userService.getByEmail(userDto.email);
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (user && passwordEquals) {
        return user;
      }
      throw new UnauthorizedException('Incorrect email or password');
    } catch (error) {
      throw new HttpException(
        `Error while validate user: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
