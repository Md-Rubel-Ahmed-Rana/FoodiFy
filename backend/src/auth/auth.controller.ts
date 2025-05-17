/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  private readonly accessTokenName: string = 'foodify_access_token';
  private readonly cookieOptions = {
    httpOnly: true,
    sameSite: 'none' as const,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
  };

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async currentUser(@Req() req) {
    const user = req.user;
    return await this.authService.getCurrentUser(user?.id);
  }

  @Get('google')
  @UseGuards(PassportAuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(PassportAuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user;
    const { accessToken } = await this.authService.googleLogin(
      user.name,
      user.email,
    );

    console.log({
      from: 'Auth controller',
      accessToken,
      user,
    });

    return res.redirect(
      `${this.configService.get<string>('POST_LOGIN_REDIRECT_URL')}?name=${user.name}&email=${user.email}&token=${accessToken}`,
    );
  }

  @Get('google/login')
  async googleLogin(@Query('token') token: string, @Res() res: Response) {
    console.log({
      from: 'Auth controller - google/login',
      accessToken: token,
    });

    if (!token) {
      throw new HttpException('Token was not found', HttpStatus.BAD_REQUEST);
    }

    // set tokens on cookie
    this.setCookies(res, token);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Logged in successfully',
      data: null,
    });
  }

  @Post('login')
  async login(@Body() body, @Res() res: Response) {
    const { accessToken } = await this.authService.login(
      body.email,
      body.password,
    );
    this.setCookies(res, accessToken);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Logged in successfully',
      data: null,
    });
  }

  @Delete('logout')
  async logout(@Res() res: Response) {
    res.clearCookie(this.accessTokenName);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User logged out successfully',
      success: true,
    });
  }

  private setCookies(res: Response, accessToken: string) {
    console.log({
      from: 'Auth controller setCookies',
      accessToken,
      accessTokenName: this.accessTokenName,
      cookieOptions: this.cookieOptions,
    });
    return res.cookie(this.accessTokenName, accessToken, this.cookieOptions);
  }
}
