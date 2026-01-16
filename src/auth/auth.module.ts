import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { AuthController } from './auth.controller';
import { LocalAuthGuard } from './guards/local-auth.guard';
import jwtConfig from './config/jwt.config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { DatabaseModule } from 'src/database/database.module';
import { authProviders } from './auth.providers';
import { RefreshTokensRepositoryDatabase } from './refresh-tokens.repository.database';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory: (config: any) => config,
    }),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    UsersModule,
    PassportModule,
    DatabaseModule,
  ],
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    RefreshAuthGuard,
    LocalAuthGuard,
    JwtAuthGuard,
    {
      provide: 'RefreshTokensRepository',
      useClass: RefreshTokensRepositoryDatabase,
    },
    ...authProviders,
  ],
  exports: [AuthService, LocalStrategy, JwtStrategy, RefreshAuthGuard],
})
export class AuthModule {}
