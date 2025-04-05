import { Controller, Post, Get, Body, Param, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { IpfsService } from './ipfs.service';
import { IpfsDto } from './dto/ipfs.dto';

@ApiTags('ipfs')
@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) {}

  @Post('upload/json')
  @ApiOperation({ summary: 'Upload JSON data to IPFS' })
  @ApiResponse({ status: 201, description: 'The IPFS hash of the uploaded JSON' })
  async uploadJSON(@Body() data: any): Promise<{ hash: string; url: string }> {
    try {
      const name = data.name || metadata-;
      const hash = await this.ipfsService.uploadJSON(data, name);
      const url = this.ipfsService.getIpfsUrl(hash);
      
      return { hash, url };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('upload/file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: IpfsDto,
  })
  @ApiOperation({ summary: 'Upload file to IPFS' })
  @ApiResponse({ status: 201, description: 'The IPFS hash of the uploaded file' })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: IpfsDto,
  ): Promise<{ hash: string; url: string }> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    try {
      const name = body.name || file.originalname || ile-;
      const hash = await this.ipfsService.uploadFile(file, name);
      const url = this.ipfsService.getIpfsUrl(hash);
      
      return { hash, url };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('url/:hash')
  @ApiOperation({ summary: 'Get IPFS URL for a hash' })
  @ApiResponse({ status: 200, description: 'The IPFS URL' })
  getIpfsUrl(@Param('hash') hash: string): { url: string } {
    return { url: this.ipfsService.getIpfsUrl(hash) };
  }
}
