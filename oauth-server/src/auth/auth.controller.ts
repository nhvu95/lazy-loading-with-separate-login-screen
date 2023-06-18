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
  async verifyToken(@Request() req, @Res() res: Response) {
    const isValid = await this.authService.validateToken(req.cookies['access_token']);
    console.log("Verify Token", req.headers.vunguyen, req.cookies['access_token'], isValid);
    if (isValid)
      res.status(200).send('OK');
    else
      throw new UnauthorizedException();
  }
}
