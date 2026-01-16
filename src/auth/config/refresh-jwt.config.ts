import { JwtSignOptions } from '@nestjs/jwt';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'refresh-jwt',
  (): JwtSignOptions => ({
    secret: process.env.REFRESH_SECRET,
    expiresIn: (process.env.REFRESH_EXPIRES_IN ??
      '7d') as JwtSignOptions['expiresIn'],
  }),
);
