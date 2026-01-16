import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator to retrieve the authenticated user from the request.
 * Can be used as @GetUser() for the full object or @GetUser('field') for a specific field.
 */
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
