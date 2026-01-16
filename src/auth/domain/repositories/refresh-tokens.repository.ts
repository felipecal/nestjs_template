import { RefreshToken } from '../refresh-token';

export interface RefreshTokensRepository {
  create(refreshToken: Partial<RefreshToken>): Promise<RefreshToken>;
  findToken(tokenHash: string, userId: string): Promise<RefreshToken | null>;
  revokeToken(tokenHash: string, userId: string): Promise<void>;
}
