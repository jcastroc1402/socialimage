import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MapperService } from '../../shared/mapper.service';
import { async } from 'rxjs';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    private readonly _mapperService: MapperService,
  ) {}

  async getById(id: number): Promise<UserDto> {
    if (!id) {
      throw new BadRequestException('id debe ser enviado');
    }

    const user: User = await this._userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return this._mapperService.map<User, UserDto>(user, new UserDto());
  }

  async getAll(): Promise<UserDto[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: 'ACTIVE' },
    });

    if (!users) {
      throw new NotFoundException();
    }

    return this._mapperService.mapCollection<User, UserDto>(
      users,
      new UserDto(),
    );
  }

  async create(userDto: UserDto): Promise<UserDto> {
    const savedUser: User = await this._userRepository.save(
      this._mapperService.map<UserDto, User>(userDto, new User()),
    );

    return this._mapperService.map<User, UserDto>(savedUser, new UserDto());
  }

  async update(id: number, userDto: UserDto): Promise<void> {
    await this._userRepository.update(
      id,
      this._mapperService.map<UserDto, User>(userDto, new User()),
    );
  }

  async delete(id: number): Promise<void> {
    const userExist = await this._userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!userExist) {
      throw new NotFoundException();
    }

    await this._userRepository.update(id, { status: 'INACTIVE' });
  }
}
