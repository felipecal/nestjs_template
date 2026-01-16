import {
  BadRequestException,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ActiveUserDto } from './dto/active-user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { ConfigService } from '@nestjs/config';
import type { RefreshTokensRepository } from './domain/repositories/refresh-tokens.repository';
import { HashingService } from '../common/hashing/hashing.service';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    @Inject('RefreshTokensRepository')
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly hashingService: HashingService,
  ) {}

  async login(
    user: ActiveUserDto,
    expiresAt?: Date,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { sub: user.userId, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('REFRESH_SECRET'),
      expiresIn: this.configService.getOrThrow('REFRESH_EXPIRES_IN'),
    });
    const tokenHash = this.hashingService.hashToken(refreshToken);

    const expiresInEnv =
      this.configService.getOrThrow<string>('REFRESH_EXPIRES_IN');
    const defaultExpirationMs = ms(expiresInEnv as Parameters<typeof ms>[0]);

    const expiration = expiresAt || new Date(Date.now() + defaultExpirationMs);

    await this.refreshTokensRepository.create({
      tokenHash,
      userId: user.userId,
      expiresAt: expiration,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refresh(
    user: ActiveUserDto,
    oldRefreshToken: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const tokenHash = this.hashingService.hashToken(oldRefreshToken);

    const refreshTokenRecord = await this.refreshTokensRepository.findToken(
      tokenHash,
      user.userId.toString(),
    );

    if (!refreshTokenRecord) {
      throw new UnauthorizedException('Refresh token invalid or revoked');
    }

    await this.refreshTokensRepository.revokeToken(
      tokenHash,
      user.userId.toString(),
    );

    const shouldKeepExpiration =
      this.configService.get('REFRESH_TOKEN_ROTATION_KEEPS_EXPIRATION') ===
      'true';

    if (shouldKeepExpiration) {
      return this.login(user, refreshTokenRecord.expiresAt);
    }

    return this.login(user);
  }

  async logout(user: ActiveUserDto, token: string): Promise<void> {
    const tokenHash = this.hashingService.hashToken(token);

    await this.refreshTokensRepository.revokeToken(
      tokenHash,
      user.userId.toString(),
    );
  }

  async register(user: CreateUserDto) {
    if (!user.name || !user.email || !user.password) {
      throw new BadRequestException(
        'You must provide name, email and password',
      );
    }
    const hashedPassword = await this.hashingService.hashPassword(
      user.password,
    );
    const createdUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });
    return new UserResponseDto(createdUser);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (
      user &&
      user.password &&
      (await this.hashingService.comparePassword(pass, user.password))
    ) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }
}
