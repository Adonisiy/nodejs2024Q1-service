import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { StatusCodes } from 'http-status-codes';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        login: dto.login,
        password: dto.password,
        version: 1,
      },
    });
    delete user.password;
    return {
      ...user,
      createdAt: +user.createdAt,
      updatedAt: +user.updatedAt,
    };
  }

  async getAllUsers() {
    const result = [];
    const users = await this.prisma.user.findMany({});
    users.forEach((s) => delete s.password);
    users.forEach((user) =>
      result.push({
        ...user,
        createdAt: +user.createdAt,
        updatedAt: +user.updatedAt,
      }),
    );
    return result;
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new HttpException('User not found', StatusCodes.NOT_FOUND);
    delete user.password;
    return {
      ...user,
      createdAt: +user.createdAt,
      updatedAt: +user.updatedAt,
    };
  }

  async putUserById(id: string, dto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new HttpException('User not found', StatusCodes.NOT_FOUND);
    if (user.password !== dto.oldPassword)
      throw new HttpException(
        'Old password is incorrect',
        StatusCodes.FORBIDDEN,
      );
    user.version++;
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: dto.newPassword,
        version: user.version,
      },
    });
    delete updatedUser.password;
    return {
      ...updatedUser,
      createdAt: +updatedUser.createdAt,
      updatedAt: +updatedUser.updatedAt,
    };
  }

  async deleteUserById(id: string) {
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new HttpException('User not found', StatusCodes.NOT_FOUND);
    }
  }
}
