import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterRequestDto } from './dto/registerRequest.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(request: RegisterRequestDto) {
    request.password = await hash(request.password, 12);
    return this.userRepository.save(request);
  }

  async getUser(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    return user;
  }

  // async login(request: LoginRequestDto) {
  //   const user = await this.userRepository.findOne({
  //     where: { email: request.email },
  //   });
  //
  //   if (!user) {
  //     throw new BadRequestException('invalid credentials');
  //   }
  //
  //   const isPasswordValid = await compare(request.password, user.password);
  //
  //   if (!isPasswordValid) {
  //     throw new BadRequestException('invalid credentials');
  //   }
  //
  //   return user;
  // }
}
