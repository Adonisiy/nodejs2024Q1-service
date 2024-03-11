import { HttpException, Injectable } from '@nestjs/common';
import { User, createCutUser, users } from 'src/database';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { StatusCodes } from 'http-status-codes';

@Injectable({})
export class UserService {
  createUser(dto: CreateUserDto) {
    const user: User = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    };
    users.push(user);
    return createCutUser(user);
  }

  getAllUsers() {
    const result = [];
    for (const user of users) {
      result.push(createCutUser(user));
    }
    return result;
  }

  getUserById(id: string) {
    const index = users.findIndex((s) => s.id === id);
    if (index === -1)
      throw new HttpException('User is not found', StatusCodes.NOT_FOUND);
    return createCutUser(users[index]);
  }

  putUserById(id: string, dto: UpdatePasswordDto) {
    const index = users.findIndex((s) => s.id === id);
    if (index === -1)
      throw new HttpException('User is not found', StatusCodes.NOT_FOUND);
    if (users[index].password !== dto.oldPassword)
      throw new HttpException(
        'Old password is incorrect',
        StatusCodes.FORBIDDEN,
      );
    users[index].password = dto.newPassword;
    users[index].version++;
    users[index].updatedAt = +new Date();
    return createCutUser(users[index]);
  }

  deleteUserById(id: string) {
    const index = users.findIndex((s) => s.id === id);
    if (index === -1)
      throw new HttpException('User is not found', StatusCodes.NOT_FOUND);
    users.splice(index, 1);
    throw new HttpException('User deleted', StatusCodes.NO_CONTENT);
  }
}
