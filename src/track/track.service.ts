import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Track, favorites, tracks } from 'src/database';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateTrackDto } from './dto/track.dto';
import { StatusCodes } from 'http-status-codes';

@Injectable({})
export class TrackService {
  createTrack(dto: CreateTrackDto) {
    if (dto.artistId !== null && !validate(dto.artistId))
      throw new HttpException(
        'artistId must be a uuid',
        StatusCodes.BAD_REQUEST,
      );
    if (dto.albumId !== null && !validate(dto.albumId))
      throw new HttpException(
        'albumId must be a uuid',
        StatusCodes.BAD_REQUEST,
      );
    const track: Track = {
      id: uuidv4(),
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    };
    tracks.push(track);
    return track;
  }

  getAllTracks() {
    return tracks;
  }

  getTrackById(id: string) {
    const index = tracks.findIndex((s) => s.id === id);
    if (index === -1)
      throw new HttpException('Track is not found', StatusCodes.NOT_FOUND);
    return tracks[index];
  }

  putTrackById(id: string, dto: CreateTrackDto) {
    if (dto.artistId !== null && !validate(dto.artistId))
      throw new HttpException(
        'artistId must be a uuid',
        StatusCodes.BAD_REQUEST,
      );
    if (dto.albumId !== null && !validate(dto.albumId))
      throw new HttpException(
        'albumId must be a uuid',
        StatusCodes.BAD_REQUEST,
      );
    const index = tracks.findIndex((s) => s.id === id);
    if (index === -1)
      throw new HttpException('Track is not found', StatusCodes.NOT_FOUND);
    tracks[index].name = dto.name;
    tracks[index].artistId = dto.artistId;
    tracks[index].albumId = dto.albumId;
    return tracks[index];
  }

  deleteTrackById(id: string) {
    let index = tracks.findIndex((s) => s.id === id);
    if (index === -1)
      throw new HttpException('Track is not found', StatusCodes.NOT_FOUND);
    tracks.splice(index, 1);
    index = favorites.tracks.findIndex((s) => s === id);
    if (index !== -1) favorites.tracks.splice(index, 1);
    throw new HttpException('Track deleted', StatusCodes.NO_CONTENT);
  }
}
