/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IUpdateUser, IUserDTO, User } from 'src/models/User';
import { Public } from 'src/shared/public';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
      private readonly userService: UserService,
      ) {}
  @Get()
  getAll(): Promise<IUserDTO[]> {
    return this.userService.findAll();
  }

  @Put()
  update(@Body() user: IUpdateUser): Promise<IUserDTO> {
    return this.userService.update(user)
  }

  @Post()
  save(@Body() user: IUserDTO): Promise<IUserDTO> {
    return this.userService.save(user)
  }

  @Delete(':id')
  async delete(@Param('id') login: string): Promise<void> {
    return await this.userService.remove(login)
  }
}
