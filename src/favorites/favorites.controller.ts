import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

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
  @HttpCode(204)
  async deleteFavoriteTrack(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoritesService.deleteFavoriteTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoritesService.deleteFavoriteAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteFavoriteArtist(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoritesService.deleteFavoriteArtist(id);
  }
}
