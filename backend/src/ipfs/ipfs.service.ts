import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class IpfsService {
  private readonly logger = new Logger(IpfsService.name);
  private readonly pinataApiUrl: string;
  private readonly pinataApiKey: string;
  private readonly pinataApiSecret: string;
  private readonly ipfsGateway: string;

  constructor(private configService: ConfigService) {
    this.pinataApiUrl = this.configService.get<string>('ipfs.apiUrl');
    this.pinataApiKey = this.configService.get<string>('ipfs.apiKey');
    this.pinataApiSecret = this.configService.get<string>('ipfs.apiSecret');
    this.ipfsGateway = this.configService.get<string>('ipfs.gateway');
  }

  async uploadJSON(data: any, name: string): Promise<string> {
    try {
      const response = await axios.post(
        ${this.pinataApiUrl}pinJSONToIPFS,
        {
          pinataContent: data,
          pinataMetadata: {
            name,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            pinata_api_key: this.pinataApiKey,
            pinata_secret_api_key: this.pinataApiSecret,
          },
        },
      );

      const ipfsHash = response.data.IpfsHash;
      this.logger.log(Uploaded JSON to IPFS with hash: );
      
      return ipfsHash;
    } catch (error) {
      this.logger.error(Error uploading JSON to IPFS: );
      throw error;
    }
  }

  async uploadFile(file: Express.Multer.File, name: string): Promise<string> {
    try {
      const formData = new FormData();
      
      formData.append('file', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
      
      formData.append(
        'pinataMetadata',
        JSON.stringify({
          name,
        }),
      );

      const response = await axios.post(
        ${this.pinataApiUrl}pinFileToIPFS,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            pinata_api_key: this.pinataApiKey,
            pinata_secret_api_key: this.pinataApiSecret,
          },
        },
      );

      const ipfsHash = response.data.IpfsHash;
      this.logger.log(Uploaded file to IPFS with hash: );
      
      return ipfsHash;
    } catch (error) {
      this.logger.error(Error uploading file to IPFS: );
      throw error;
    }
  }

  getIpfsUrl(hash: string): string {
    return ${this.ipfsGateway};
  }
}
