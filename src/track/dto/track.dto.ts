import { IsNotEmpty, IsString, IsInt, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ValidateIf((obj, value) => value !== null)
  artistId: string | null;

  @IsString()
  @ValidateIf((obj, value) => value !== null)
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
