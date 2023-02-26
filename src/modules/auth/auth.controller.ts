import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';
import { SETTINGS } from '../../app.utils';
import { UserService } from '../user/user.service';
import * as process from 'process';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/signup')
  @ApiCreatedResponse({
    description: 'Create user object',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  async doUserRegistration(
    @Body(SETTINGS.VALIDATION_PIPE)
    userRegister: CreateUserDto,
  ): Promise<User> {
    return await this.userService.doUserRegistration(userRegister);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request, @Body() loginDto: LoginDto): Promise<any> {
    const expirationDate = new Date();
    expirationDate.setDate(
      expirationDate.getDate() + parseInt(process.env.TOKEN_EXPIRATION_DAYS),
    );
    const token = this.authService.generateToken(request.user);
    const response = {
      id: request.user.id,
      email: request.user.email,
      token: token.access_token,
      tokenExpirationDate: expirationDate,
    };

    return response;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Request() request): Promise<any> {
    return request.user;
  }
}
