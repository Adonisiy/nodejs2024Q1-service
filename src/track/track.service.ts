import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/track.dto';
import { StatusCodes } from 'http-status-codes';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async createTrack(dto: CreateTrackDto) {
    return await this.prisma.track.create({
      data: {
        name: dto.name,
        artistId: dto.artistId,
        albumId: dto.albumId,
        duration: dto.duration,
      },
    });
  }

  async getAllTracks() {
    return await this.prisma.track.findMany({});
  }

  async getTrackById(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track)
      throw new HttpException('Track not found', StatusCodes.NOT_FOUND);
    return track;
  }

  async putTrackById(id: string, dto: CreateTrackDto) {
    try {
      return await this.prisma.track.update({
        where: {
          id,
        },
        data: {
          name: dto.name,
          artistId: dto.artistId,
          albumId: dto.albumId,
          duration: dto.duration,
        },
      });
    } catch (e) {
      throw new HttpException('Track not found', StatusCodes.NOT_FOUND);
    }
  }

  async deleteTrackById(id: string) {
    try {
      await this.prisma.track.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new HttpException('Track not found', StatusCodes.NOT_FOUND);
    }
  }
}
