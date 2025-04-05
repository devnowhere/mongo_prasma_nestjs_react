import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class IpfsDto {
  @ApiProperty({
    description: 'File to upload',
    type: 'string',
    format: 'binary',
  })
  file: any;

  @ApiProperty({
    description: 'Optional name for the file',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
