import { IsNotEmpty, IsString, IsInt, ValidateIf } from 'class-validator';

export class CreateFavoritesDto {
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
