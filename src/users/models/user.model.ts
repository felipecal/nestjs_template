import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  HasMany,
  IsEmail,
  Unique,
  AllowNull,
  Default,
} from 'sequelize-typescript';
import { RefreshToken } from 'src/auth/models/refresh-token.model';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column
  declare name: string;

  @IsEmail
  @Unique
  @AllowNull(false)
  @Column
  declare email: string;

  @AllowNull(false)
  @Column
  declare password: string;

  @HasMany(() => RefreshToken)
  declare refreshTokens: RefreshToken[];
}
