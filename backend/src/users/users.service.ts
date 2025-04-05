import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(walletAddress: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { walletAddress } });
    
    if (!user) {
      throw new NotFoundException(User with wallet address  not found);
    }
    
    return user;
  }

  async findOneOrCreate(walletAddress: string): Promise<User> {
    try {
      return await this.findOne(walletAddress);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return this.create({ walletAddress });
      }
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async update(walletAddress: string, updateUserDto: Partial<CreateUserDto>): Promise<User> {
    const user = await this.findOne(walletAddress);
    
    Object.assign(user, updateUserDto);
    
    return this.usersRepository.save(user);
  }

  async remove(walletAddress: string): Promise<void> {
    const user = await this.findOne(walletAddress);
    await this.usersRepository.remove(user);
  }
}
