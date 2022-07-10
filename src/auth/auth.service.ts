import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser(email);
    const passwordValid = await compare(password, user.password);

    if (!user) {
      throw new NotAcceptableException('could not find user');
    }

    if (user && passwordValid) {
      return {
        userId: user.id,
        email: user.email,
      };
    }

    return null;
  }
}
