import { Module } from '@nestjs/common';
import { ArtistController } from './artist.contoller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
