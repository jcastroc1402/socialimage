import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async SignUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this._authService.SignUp(signUpDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async SignIn(@Body() signInDto: SignInDto) {
    return this._authService.SignIn(signInDto);
  }
}
