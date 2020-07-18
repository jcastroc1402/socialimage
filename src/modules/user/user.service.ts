import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ReadUserDto, UpdateUserDto } from './dto';
import { plainToClass } from 'class-transformer';
import { RoleRepository } from '../role/role.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async getById(id: number): Promise<ReadUserDto> {
    if (!id) {
      throw new BadRequestException('id debe ser enviado');
    }

    const user: User = await this._userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return plainToClass(ReadUserDto, user);
  }

  async getAll(): Promise<ReadUserDto[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: 'ACTIVE' },
    });

    if (!users) {
      throw new NotFoundException();
    }

    return users.map(user => plainToClass(ReadUserDto, user));
  }

  async update(id: number, userDto: UpdateUserDto): Promise<ReadUserDto> {
    const userExist = await this._userRepository.findOne(id, {
      where: { id: id, status: 'ACTIVE' },
    });

    if (!userExist) {
      throw new NotFoundException('Usuario no existe');
    }

    userExist.username = userDto.username;
    const updatedUser = await this._userRepository.save(userExist);

    return plainToClass(ReadUserDto, updatedUser);
  }

  async delete(id: number): Promise<boolean> {
    const userExist = await this._userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!userExist) {
      throw new NotFoundException();
    }

    await this._userRepository.update(id, { status: 'INACTIVE' });
    return true;
  }

  async SetRoleToUser(userId: number, roleId): Promise<boolean> {
    const userExist = await this._userRepository.findOne(userId, {
      where: { id: userId, status: 'ACTIVE' },
    });

    if (!userExist) {
      throw new NotFoundException('Usuario no existe');
    }

    const roleExist = await this._roleRepository.findOne(roleId, {
      where: { id: roleId, status: 'ACTIVE' },
    });

    if (!roleExist) {
      throw new NotFoundException('Rol no existe');
    }

    userExist.roles.push(roleExist);
    await this._userRepository.save(userExist);

    return true;
  }
}
