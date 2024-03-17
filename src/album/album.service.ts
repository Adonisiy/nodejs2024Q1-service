import { HttpException, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/album.dto';
import { StatusCodes } from 'http-status-codes';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async createAlbum(dto: CreateAlbumDto) {
    return await this.prisma.album.create({
      data: {
        name: dto.name,
        year: dto.year,
        artistId: dto.artistId,
      },
    });
  }

  async getAllAlbums() {
    return await this.prisma.album.findMany({});
  }

  async getAlbumById(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album)
      throw new HttpException('Album not found', StatusCodes.NOT_FOUND);
    return album;
  }

  async putAlbumById(id: string, dto: CreateAlbumDto) {
    try {
      return await this.prisma.album.update({
        where: {
          id,
        },
        data: {
          name: dto.name,
          year: dto.year,
          artistId: dto.artistId,
        },
      });
    } catch (e) {
      throw new HttpException('Album not found', StatusCodes.NOT_FOUND);
    }
  }

  async deleteAlbumById(id: string) {
    try {
      await this.prisma.album.delete({
        where: {
          id,
        },
      });
      await this.prisma.track.updateMany({
        where: {
          albumId: id,
        },
        data: {
          albumId: null,
        },
      });
    } catch (e) {
      throw new HttpException('Album not found', StatusCodes.NOT_FOUND);
    }
  }
}
