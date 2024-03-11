import { HttpException, Injectable } from '@nestjs/common';
import { Album, albums, favorites, tracks } from 'src/database';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateAlbumDto } from './dto/album.dto';
import { StatusCodes } from 'http-status-codes';

@Injectable({})
export class AlbumService {
  createAlbum(dto: CreateAlbumDto) {
    if (dto.artistId !== null && !validate(dto.artistId))
      throw new HttpException(
        'artistId must be a uuid',
        StatusCodes.BAD_REQUEST,
      );
    const album: Album = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    };
    albums.push(album);
    return album;
  }

  getAllAlbums() {
    return albums;
  }

  getAlbumById(id: string) {
    const index = albums.findIndex((s) => s.id === id);
    if (index === -1)
      throw new HttpException('Album is not found', StatusCodes.NOT_FOUND);
    return albums[index];
  }

  putAlbumById(id: string, dto: CreateAlbumDto) {
    if (dto.artistId !== null && !validate(dto.artistId))
      throw new HttpException(
        'artistId must be a uuid',
        StatusCodes.BAD_REQUEST,
      );
    const index = albums.findIndex((s) => s.id === id);
    if (index === -1)
      throw new HttpException('Album is not found', StatusCodes.NOT_FOUND);
    albums[index].name = dto.name;
    albums[index].year = dto.year;
    albums[index].artistId = dto.artistId;
    return albums[index];
  }

  deleteAlbumById(id: string) {
    let index = albums.findIndex((s) => s.id === id);
    if (index === -1)
      throw new HttpException('Album is not found', StatusCodes.NOT_FOUND);
    albums.splice(index, 1);
    for (const track of tracks) if (track.albumId === id) track.albumId = null;
    index = favorites.albums.findIndex((s) => s === id);
    if (index !== -1) favorites.albums.splice(index, 1);
    throw new HttpException('Album deleted', StatusCodes.NO_CONTENT);
  }
}
