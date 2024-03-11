import { IsNotEmpty, IsString, IsInt, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsString()
  @ValidateIf((obj, value) => value !== null)
  artistId: string | null;
}
