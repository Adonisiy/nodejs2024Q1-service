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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  createAlbum(@Body() dto: CreateAlbumDto) {
    return this.albumService.createAlbum(dto);
  }

  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbumById(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.getAlbumById(id);
  }

  @Put(':id')
  putUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    dto: CreateAlbumDto,
  ) {
    return this.albumService.putAlbumById(id, dto);
  }

  @Delete(':id')
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    this.albumService.deleteAlbumById(id);
  }
}
