import { Injectable, Inject } from '@nestjs/common';
import { RefreshTokensRepository } from './domain/repositories/refresh-tokens.repository';
import { RefreshToken } from './domain/refresh-token';
import { RefreshTokenMapper } from './mappers/refresh-token.mapper';
import { RefreshToken as RefreshTokenModel } from './models/refresh-token.model';

@Injectable()
export class RefreshTokensRepositoryDatabase implements RefreshTokensRepository {
  constructor(
    @Inject('REFRESH_TOKEN_REPOSITORY')
    private readonly refreshTokenModel: typeof RefreshTokenModel,
  ) {}

  async create(data: Partial<RefreshToken>): Promise<RefreshToken> {
    const refreshToken = await this.refreshTokenModel.create(data as any);
    return RefreshTokenMapper.toDomain(refreshToken);
  }

  async findToken(
    tokenHash: string,
    userId: string,
  ): Promise<RefreshToken | null> {
    const refreshToken = await this.refreshTokenModel.findOne({
      where: { tokenHash, userId, revokedAt: null },
    });
    return refreshToken ? RefreshTokenMapper.toDomain(refreshToken) : null;
  }

  async revokeToken(tokenHash: string, userId: string): Promise<void> {
    await this.refreshTokenModel.update(
      { revokedAt: new Date() },
      { where: { tokenHash, userId } },
    );
  }
}
