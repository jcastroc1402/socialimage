import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  async getUser(@Param() id: number): Promise<UserDto> {
    const userDto = await this._userService.getById(id);
    return userDto;
  }

  @Get()
  async GetUsers(): Promise<UserDto[]> {
    const usersDto = await this._userService.getAll();
    return usersDto;
  }

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<UserDto> {
    const createUser = await this._userService.create(userDto);
    return createUser;
  }

  @Patch(':id')
  async updateUser(@Param() id: number, @Body() userDto: UserDto) {
    await this._userService.update(id, userDto);
  }

  @Delete(':id')
  async deleteUser(@Param() id: number) {
    await this._userService.delete(id);
    return true;
  }
}
