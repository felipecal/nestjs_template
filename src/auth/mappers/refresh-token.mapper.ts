import { RefreshToken as RefreshTokenModel } from '../models/refresh-token.model';
import { RefreshToken } from '../domain/refresh-token';

export class RefreshTokenMapper {
  static toDomain(refreshTokenModel: RefreshTokenModel): RefreshToken {
    return new RefreshToken({
      id: refreshTokenModel.id,
      tokenHash: refreshTokenModel.tokenHash,
      userId: refreshTokenModel.userId,
      revokedAt: refreshTokenModel.revokedAt,
      expiresAt: refreshTokenModel.expiresAt,
      createdAt: refreshTokenModel.createdAt,
      updatedAt: refreshTokenModel.updatedAt,
    });
  }
}
