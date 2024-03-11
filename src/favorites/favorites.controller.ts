import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoritesDto } from './dto/favorites.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post('track/:id')
  addFavoriteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addFavoriteTrack(id);
  }

  @Post('artist/:id')
  addFavoriteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addFavoriteArtist(id);
  }

  @Post('album/:id')
  addFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addFavoriteAlbum(id);
  }

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Delete('track/:id')
  deleteFavoriteTrack(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.deleteFavoriteTrack(id);
  }

  @Delete('album/:id')
  deleteFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.deleteFavoriteAlbum(id);
  }

  @Delete('artist/:id')
  deleteFavoriteArtist(@Param('id', ParseUUIDPipe) id: string) {
    this.favoritesService.deleteFavoriteArtist(id);
  }
}
