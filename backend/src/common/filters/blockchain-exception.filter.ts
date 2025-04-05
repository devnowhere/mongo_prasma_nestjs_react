import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export class BlockchainExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(BlockchainExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = typeof exceptionResponse === 'object' 
        ? (exceptionResponse as any).message || exception.message
        : exception.message;
    } else {
      // Handle blockchain-specific errors
      if (exception.message.includes('insufficient funds')) {
        status = HttpStatus.BAD_REQUEST;
        message = 'Insufficient funds for transaction';
      } else if (exception.message.includes('transaction failed')) {
        status = HttpStatus.BAD_REQUEST;
        message = 'Transaction failed';
      } else {
        message = exception.message;
      }
    }
    
    this.logger.error(${request.method}  : );
    
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
