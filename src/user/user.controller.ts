import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterRequestDto } from './dto/registerRequest.dto';
import { LocalAuthGuard } from '../auth/local.auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body() request: RegisterRequestDto) {
    return this.userService.register(request);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request): any {
    return {
      user: request.user,
      message: 'User logged in',
    };
  }

  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { message: 'The user session has ended' };
  }
}
