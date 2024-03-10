import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist, artists } from 'src/database';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/Artist.dto';
import { StatusCodes } from 'http-status-codes';

@Injectable({})
export class ArtistService {
  createArtist(dto: CreateArtistDto) {
    const artist: Artist = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto.grammy,
    };
    artists.push(artist);
    return artist;
  }

  getAllArtists() {
    return artists;
  }

  getArtistById(id: string) {
    const index = artists.findIndex((s) => s.id === id);
    if (index === -1)
      throw new HttpException('Artist is not found', StatusCodes.NOT_FOUND);
    return artists[index];
  }

  putArtistById(id: string, dto: CreateArtistDto) {
    const index = artists.findIndex((s) => s.id === id);
    if (index === -1)
      throw new HttpException('Artist is not found', StatusCodes.NOT_FOUND);
    artists[index].name = dto.name;
    artists[index].grammy = dto.grammy;
    return artists[index];
  }

  deleteArtistById(id: string) {
    const index = artists.findIndex((s) => s.id === id);
    if (index === -1)
      throw new HttpException('Artist is not found', StatusCodes.NOT_FOUND);
    artists.splice(index, 1);
    throw new HttpException('Artist deleted', StatusCodes.NO_CONTENT);
  }
}
