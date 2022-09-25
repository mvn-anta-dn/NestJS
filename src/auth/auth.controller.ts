import { AuthDTO } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from './../common/pipes/validation.pipe';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: AuthDTO) {
    return this.authService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: AuthDTO) {
    return this.authService.register(data);
  }
}
