import { HttpException, Injectable } from '@nestjs/common';
// import { Artist, albums, artists, favorites, tracks } from 'src/database';
import { CreateArtistDto } from './dto/Artist.dto';
import { StatusCodes } from 'http-status-codes';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async createArtist(dto: CreateArtistDto) {
    return await this.prisma.artist.create({
      data: {
        name: dto.name,
        grammy: dto.grammy,
      },
    });
  }

  async getAllArtists() {
    return await this.prisma.artist.findMany({});
  }

  async getArtistById(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist)
      throw new HttpException('Artist not found', StatusCodes.NOT_FOUND);
    return artist;
  }

  async putArtistById(id: string, dto: CreateArtistDto) {
    try {
      return await this.prisma.artist.update({
        where: {
          id,
        },
        data: {
          name: dto.name,
          grammy: dto.grammy,
        },
      });
    } catch (e) {
      throw new HttpException('Artist is not found', StatusCodes.NOT_FOUND);
    }
  }

  async deleteArtistById(id: string) {
    // let index = artists.findIndex((s) => s.id === id);
    // if (index === -1)
    //   throw new HttpException('Artist is not found', StatusCodes.NOT_FOUND);
    // artists.splice(index, 1);
    // for (const album of albums)
    //   if (album.artistId === id) album.artistId = null;
    // for (const track of tracks)
    //   if (track.artistId === id) track.artistId = null;
    // index = favorites.artists.findIndex((s) => s === id);
    // if (index !== -1) favorites.artists.splice(index, 1);
    // throw new HttpException('Artist deleted', StatusCodes.NO_CONTENT);
    try {
      await this.prisma.artist.delete({
        where: {
          id,
        },
      });
      await this.prisma.album.updateMany({
        where: {
          artistId: id,
        },
        data: {
          artistId: null,
        },
      });
    } catch (e) {
      throw new HttpException('Artist not found', StatusCodes.NOT_FOUND);
    }
  }
}
