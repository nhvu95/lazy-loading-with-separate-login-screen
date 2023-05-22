import { Controller, Request, Post, UseGuards, Get, Res, Put, ImATeapotException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req, @Res() res: Response) {
    this.authService.login(req.user, res);
  }

  @Put('/logout')
  async logout(@Res() res: Response) {
    this.authService.logout(res);
  }

  @Get('/verify-token')
  async verifyToken(@Request() req) {
    const isValid = await this.authService.validateToken(req.headers.authorization);
    console.log("Verify Token", req.headers.vunguyen, req.headers.authorization, isValid);
    if (isValid)
      throw new ImATeapotException();
    else
      throw new UnauthorizedException();
  }
}
