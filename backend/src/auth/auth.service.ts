/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from 'src/lib/bcrypt';
import { GetUserDto } from 'src/user/dto/get-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private readonly accessTokenExpire: number = 60 * 60 * 24 * 30;
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  private async generateTokens(payload: {
    id: string;
    email: string;
    name: string;
  }): Promise<{ accessToken: string }> {
    const accessTokenSecret = this.configService.get('JWT_SECRET');
    const accessToken = this.jwtService.sign(payload, {
      secret: accessTokenSecret,
      expiresIn: this.accessTokenExpire,
    });

    return { accessToken: `Bearer ${accessToken}` };
  }

  async googleLogin(
    name: string,
    email: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.userCreateOrLogin(name, email);
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return this.generateTokens(payload);
  }

  async getCurrentUser(id: string): Promise<{
    data: GetUserDto;
    message: string;
    success: boolean;
    statusCode: number;
  }> {
    const user = await this.userService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Current logged in user fetched successfully',
      success: true,
      data: new GetUserDto(
        user?.id || user._id,
        user.name,
        user.email,
        user.createdAt,
        user.updatedAt,
      ),
    };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.findUserByEmail(email);

    const isMatch = await Bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const payload = {
      id: user.id || user?._id,
      email: user.email,
      name: user.name,
    };

    return this.generateTokens(payload);
  }
}
