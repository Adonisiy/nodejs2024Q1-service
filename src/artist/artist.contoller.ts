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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private ArtistService: ArtistService) {}

  @Post()
  createArtist(@Body() dto: CreateArtistDto) {
    return this.ArtistService.createArtist(dto);
  }

  @Get()
  getAllArtists() {
    return this.ArtistService.getAllArtists();
  }

  @Get(':id')
  getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    return this.ArtistService.getArtistById(id);
  }

  @Put(':id')
  putArtistById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    dto: CreateArtistDto,
  ) {
    return this.ArtistService.putArtistById(id, dto);
  }

  @Delete(':id')
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    this.ArtistService.deleteArtistById(id);
  }
}
