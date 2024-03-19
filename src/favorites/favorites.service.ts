import { HttpException, Injectable } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async addFavoriteTrack(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track)
      throw new HttpException(
        'Track missing',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    const favorites = await this.prisma.favorites.findUnique({
      where: {
        id: 0,
      },
    });
    if (!favorites)
      await this.prisma.favorites.create({
        data: {
          id: 0,
        },
      });
    const { tracks } = await this.prisma.favorites.findUnique({
      where: {
        id: 0,
      },
      select: {
        tracks: true,
      },
    });
    tracks.push(id);
    await this.prisma.favorites.update({
      where: {
        id: 0,
      },
      data: {
        tracks,
      },
    });
    return track;
  }

  async addFavoriteArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist)
      throw new HttpException(
        'Artist missing',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    const favorites = await this.prisma.favorites.findUnique({
      where: {
        id: 0,
      },
    });
    if (!favorites)
      await this.prisma.favorites.create({
        data: {
          id: 0,
        },
      });
    const { artists } = await this.prisma.favorites.findUnique({
      where: {
        id: 0,
      },
      select: {
        artists: true,
      },
    });
    artists.push(id);
    await this.prisma.favorites.update({
      where: {
        id: 0,
      },
      data: {
        artists,
      },
    });
    return artist;
  }

  async addFavoriteAlbum(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album)
      throw new HttpException(
        'Album missing',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    const favorites = await this.prisma.favorites.findUnique({
      where: {
        id: 0,
      },
    });
    if (!favorites)
      await this.prisma.favorites.create({
        data: {
          id: 0,
        },
      });
    const { albums } = await this.prisma.favorites.findUnique({
      where: {
        id: 0,
      },
      select: {
        albums: true,
      },
    });
    albums.push(id);
    await this.prisma.favorites.update({
      where: {
        id: 0,
      },
      data: {
        albums,
      },
    });
    return album;
  }

  async getAllFavorites() {
    let favorites = await this.prisma.favorites.findUnique({
      where: {
        id: 0,
      },
    });
    if (!favorites) {
      await this.prisma.favorites.create({
        data: {
          id: 0,
        },
      });
      favorites = await this.prisma.favorites.findUnique({
        where: {
          id: 0,
        },
      });
    }
    return {
      artists: await this.prisma.artist.findMany({
        where: {
          id: {
            in: favorites.artists,
          },
        },
      }),
      albums: await this.prisma.album.findMany({
        where: {
          id: {
            in: favorites.albums,
          },
        },
      }),
      tracks: await this.prisma.track.findMany({
        where: {
          id: {
            in: favorites.tracks,
          },
        },
      }),
    };
  }

  async deleteFavoriteTrack(id: string) {
    const { tracks } = await this.prisma.favorites.findUnique({
      where: {
        id: 0,
      },
    });
    const index = tracks.findIndex((s) => s === id);
    tracks.splice(index, 1);
    await this.prisma.favorites.update({
      where: {
        id: 0,
      },
      data: {
        tracks,
      },
    });
  }

  async deleteFavoriteAlbum(id: string) {
    const { albums } = await this.prisma.favorites.findUnique({
      where: {
        id: 0,
      },
    });
    const index = albums.findIndex((s) => s === id);
    albums.splice(index, 1);
    await this.prisma.favorites.update({
      where: {
        id: 0,
      },
      data: {
        albums,
      },
    });
  }

  async deleteFavoriteArtist(id: string) {
    const { artists } = await this.prisma.favorites.findUnique({
      where: {
        id: 0,
      },
    });
    const index = artists.findIndex((s) => s === id);
    artists.splice(index, 1);
    await this.prisma.favorites.update({
      where: {
        id: 0,
      },
      data: {
        artists,
      },
    });
  }
}
