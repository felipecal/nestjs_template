import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: (process.env.JWT_EXPIRES_IN ??
        '30m') as JwtSignOptions['expiresIn'],
    },
  }),
);
