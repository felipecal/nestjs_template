export class RefreshToken {
  id: string;
  tokenHash: string;
  userId: string;
  revokedAt?: Date;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<RefreshToken>) {
    Object.assign(this, partial);
  }
}
