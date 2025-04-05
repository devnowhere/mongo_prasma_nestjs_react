import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class WalletAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const { signature, message, walletAddress } = request.headers;

    if (!signature || !message || !walletAddress) {
      throw new UnauthorizedException('Missing authentication parameters');
    }

    try {
      // Verify that the signature matches the message and wallet address
      const recoveredAddress = ethers.utils.verifyMessage(message, signature);
      
      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        throw new UnauthorizedException('Invalid signature');
      }
      
      // Attach wallet address to request for use in controllers
      request.walletAddress = walletAddress;
      
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid signature');
    }
  }
}
