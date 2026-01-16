import { RefreshToken } from './models/refresh-token.model';

export const authProviders = [
  {
    provide: 'REFRESH_TOKEN_REPOSITORY',
    useValue: RefreshToken,
  },
];
