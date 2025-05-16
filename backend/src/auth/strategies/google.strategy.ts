/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails } = profile;

    console.log({
      from: 'Google strategy',
      data: {
        email: emails[0].value,
        name: `${name.givenName} ${name.familyName}`,
        provider: 'google',
        accessToken,
      },
      profile,
    });
    const user = {
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      provider: 'google',
      accessToken,
    };
    done(null, user);
  }
}
