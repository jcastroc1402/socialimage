import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { ReadRoleDto, CreateRoleDto } from './dto';

@Controller('role')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get(':id')
  GetRole(@Param('id', ParseIntPipe) id: number): Promise<ReadRoleDto> {
    return this._roleService.GetById(id);
  }

  @Get()
  GetRoles(): Promise<ReadRoleDto[]> {
    return this._roleService.GetAll();
  }

  @Post()
  CreateRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    return this._roleService.Create(role);
  }

  @Patch(':id')
  UpdateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: Role,
  ): Promise<ReadRoleDto> {
    return this._roleService.Update(id, userDto);
  }

  @Delete(':id')
  DeleteRole(@Param('id', ParseIntPipe) id: number) {
    this._roleService.Delete(id);
    return true;
  }
}
