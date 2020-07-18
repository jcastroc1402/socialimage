import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, SignInDto } from './dto';
import { AuthRepository } from './auth.repository';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt.payload.interface';
import { RoleType } from '../role/roletype.enum';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async SignUp(signUp: SignUpDto): Promise<void> {
    const { username, email } = signUp;

    const userExist = await this._authRepository.findOne({
      where: { username: username, email: email },
    });

    if (userExist) {
      throw new ConflictException('Usuario o email ya esta registrado');
    }

    return this._authRepository.SignUp(signUp);
  }

  async SignIn(signIn: SignInDto): Promise<{ token: string }> {
    const { username, password } = signIn;

    //Verificar si existe usuario
    const user: User = await this._authRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('Usuario no registrado');
    }

    //Verificar si coincide la contraseña
    const Coincidence = await compare(password, user.password);

    if (!Coincidence) {
      throw new UnauthorizedException('Contraseña erronea');
    }

    //Crear payload
    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      roles: user.roles.map(role => role.name as RoleType),
    };

    //Crear token
    const token = await this._jwtService.sign(payload);
    return { token };
  }
}
