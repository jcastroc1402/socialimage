import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { async } from 'rxjs';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _RoleRepository: RoleRepository,
  ) {}

  async GetById(id: number): Promise<Role> {
    if (!id) {
      throw new BadRequestException('id invalido');
    }

    const role = await this._RoleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }

  async GetAll(): Promise<Role[]> {
    const roles: Role[] = await this._RoleRepository.find({
      where: { status: 'ACTIVE' },
    });

    if (!roles) {
      throw new NotFoundException();
    }

    return roles;
  }

  async Create(role: Role): Promise<Role> {
    const savedRole = await this._RoleRepository.save(role);
    return savedRole;
  }

  async Update(id: number, role: Role): Promise<void> {
    if (!id) {
      throw new BadRequestException('Id invalido');
    }

    await this._RoleRepository.update(id, role);
  }

  async Delete(id: number): Promise<void> {
    if (!id) {
      throw new BadRequestException();
    }

    const roleExist: Role = await this._RoleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!roleExist) {
      throw new NotFoundException();
    }

    await this._RoleRepository.update(id, { status: 'INACTIVE' });
  }
}
