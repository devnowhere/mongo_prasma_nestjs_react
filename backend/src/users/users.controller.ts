import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { WalletAddress } from '../common/decorators/wallet-address.decorator';
import { WalletAuthGuard } from '../common/guards/wallet-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users', type: [User] })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':address')
  @ApiOperation({ summary: 'Get user by wallet address' })
  @ApiResponse({ status: 200, description: 'Return the user', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('address') address: string): Promise<User> {
    try {
      return await this.usersService.findOne(address);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been created', type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':address')
  @UseGuards(WalletAuthGuard)
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'The user has been updated', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('address') address: string,
    @Body() updateUserDto: UpdateUserDto,
    @WalletAddress() walletAddress: string,
  ): Promise<User> {
    if (address !== walletAddress) {
      throw new HttpException('You can only update your own profile', HttpStatus.FORBIDDEN);
    }
    
    try {
      return await this.usersService.update(address, updateUserDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':address')
  @UseGuards(WalletAuthGuard)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'The user has been deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(
    @Param('address') address: string,
    @WalletAddress() walletAddress: string,
  ): Promise<{ message: string }> {
    if (address !== walletAddress) {
      throw new HttpException('You can only delete your own profile', HttpStatus.FORBIDDEN);
    }
    
    try {
      await this.usersService.remove(address);
      return { message: 'User deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
