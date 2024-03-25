import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  createTrack(@Body() dto: CreateTrackDto) {
    return this.trackService.createTrack(dto);
  }

  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  getTrackById(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.getTrackById(id);
  }

  @Put(':id')
  putTrackById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    dto: CreateTrackDto,
  ) {
    return this.trackService.putTrackById(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    await this.trackService.deleteTrackById(id);
  }
}
