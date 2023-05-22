import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user; // Exclude the password from the response
      return result;
    }
    return null;
  }

  async login(user: User, res: Response) {
    const payload = { username: user.username, sub: user.userId };
    const token = this.jwtService.sign(payload);
    res.cookie('access_token', token, {expires: new Date(Date.now() + 900000), domain: "localdomain"});
    res.send();
  }

  logout(res: Response) {
    this.clearCookie(res, 'access_token');
    res.send();
  }

  clearCookie(res: Response, name: string) {
    res.cookie(name, '', { expires: new Date(0) });
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const tokenWithoutBearer = token.replace('Bearer ', '');
      const decoded = this.jwtService.verify(tokenWithoutBearer);
      const user = await this.usersService.findById(decoded.sub);
      return !!user;
    } catch (error) {
      return false;
    }
  }
}
