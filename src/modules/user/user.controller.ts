import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ReadUserDto, UpdateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  GetUser(@Param('id', ParseIntPipe) id: number): Promise<ReadUserDto> {
    return this._userService.getById(id);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get()
  @Roles('ADMIN', 'GENERAL')
  @UseGuards(AuthGuard(), RoleGuard)
  GetUsers(): Promise<ReadUserDto[]> {
    return this._userService.getAll();
  }

  @Patch(':id')
  UpdateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UpdateUserDto,
  ) {
    return this._userService.update(id, userDto);
  }

  @Delete(':id')
  DeleteUser(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this._userService.delete(id);
  }

  @Post('setRole/:userId/:roleId')
  SetRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<Boolean> {
    return this._userService.SetRoleToUser(userId, roleId);
  }
}
