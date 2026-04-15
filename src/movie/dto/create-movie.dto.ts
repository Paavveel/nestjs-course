import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @IsString()
  @IsUrl()
  imageUrl: string;

  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];
}
