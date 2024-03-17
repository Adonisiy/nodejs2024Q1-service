import { HttpException, Injectable } from '@nestjs/common';
// import {
//   FavoritesResponse,
//   albums,
//   artists,
//   favorites,
//   tracks,
// } from 'src/database';
import { StatusCodes } from 'http-status-codes';

@Injectable({})
export class FavoritesService {
  addFavoriteTrack(id: string) {
    // const index = tracks.findIndex((s) => s.id === id);
    // if (index === -1)
    //   throw new HttpException(
    //     'Track missing',
    //     StatusCodes.UNPROCESSABLE_ENTITY,
    //   );
    // favorites.tracks.push(id);
    // return tracks.find((s) => s.id === id);
  }

  addFavoriteArtist(id: string) {
    // const index = artists.findIndex((s) => s.id === id);
    // if (index === -1)
    //   throw new HttpException(
    //     'Artist missing',
    //     StatusCodes.UNPROCESSABLE_ENTITY,
    //   );
    // favorites.artists.push(id);
    // return artists.find((s) => s.id === id);
  }

  addFavoriteAlbum(id: string) {
    // const index = albums.findIndex((s) => s.id === id);
    // if (index === -1)
    //   throw new HttpException(
    //     'Album missing',
    //     StatusCodes.UNPROCESSABLE_ENTITY,
    //   );
    // favorites.albums.push(id);
    // return albums.find((s) => s.id === id);
  }

  getAllFavorites() {
    // const result: FavoritesResponse = { artists: [], albums: [], tracks: [] };
    // for (const id of favorites.tracks)
    //   result.tracks.push(tracks.find((s) => s.id === id));
    // for (const id of favorites.artists)
    //   result.artists.push(artists.find((s) => s.id === id));
    // for (const id of favorites.albums)
    //   result.albums.push(albums.find((s) => s.id === id));
    // return result;
  }

  deleteFavoriteTrack(id: string) {
    // const index = favorites.tracks.findIndex((s) => s === id);
    // favorites.tracks.splice(index, 1);
    // throw new HttpException('Track deleted', StatusCodes.NO_CONTENT);
  }

  deleteFavoriteAlbum(id: string) {
    // const index = favorites.albums.findIndex((s) => s === id);
    // favorites.albums.splice(index, 1);
    // throw new HttpException('Album deleted', StatusCodes.NO_CONTENT);
  }

  deleteFavoriteArtist(id: string) {
    // const index = favorites.artists.findIndex((s) => s === id);
    // favorites.artists.splice(index, 1);
    // throw new HttpException('Artist deleted', StatusCodes.NO_CONTENT);
  }
}
