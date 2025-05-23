import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const WalletAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.walletAddress;
  },
);
