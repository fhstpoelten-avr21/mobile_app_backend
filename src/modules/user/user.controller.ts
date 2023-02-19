import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { SETTINGS } from 'src/app.utils';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  async doUserRegistration(
    @Body(SETTINGS.VALIDATION_PIPE)
    userRegister: CreateUserDto,
  ): Promise<User> {
    return await this.userService.doUserRegistration(userRegister);
  }

  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
