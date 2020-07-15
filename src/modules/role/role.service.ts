import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { async } from 'rxjs';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _RoleRepository: RoleRepository,
  ) {}

  async GetById(id: number): Promise<ReadRoleDto> {
    if (!id) {
      throw new BadRequestException('id invalido');
    }

    const role = await this._RoleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!role) {
      throw new NotFoundException();
    }

    return plainToClass(ReadRoleDto, role);
  }

  async GetAll(): Promise<ReadRoleDto[]> {
    const roles: Role[] = await this._RoleRepository.find({
      where: { status: 'ACTIVE' },
    });

    if (!roles) {
      throw new NotFoundException();
    }

    return roles.map(role => plainToClass(ReadRoleDto, role));
  }

  //Partial indica que se puede ingresar parcialmente los atributos de CreateRoleDto
  async Create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const savedRole: Role = await this._RoleRepository.save(role);
    return plainToClass(ReadRoleDto, savedRole);
  }

  async Update(id: number, role: Partial<UpdateRoleDto>): Promise<ReadRoleDto> {
    if (!id) {
      throw new BadRequestException('Id invalido');
    }

    const roleExist = await this._RoleRepository.findOne(id);

    if (!roleExist) {
      throw new NotFoundException();
    }

    roleExist.name = role.name;
    roleExist.description = role.description;

    const updatedRole: ReadRoleDto = await this._RoleRepository.save(roleExist);

    return plainToClass(ReadRoleDto, updatedRole);
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
