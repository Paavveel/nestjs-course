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
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieRequest {
  @ApiProperty({
    description: 'Name of the movie',
    example: 'The matrix',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Release year',
    example: 1999,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @ApiProperty({
    description: 'Url of the movie',
    example: 'https://example.com/12345.png',
    type: String,
  })
  @IsString()
  @IsUrl()
  imageUrl: string;

  @ApiProperty({
    description: 'Actors ids array',
    example: ['1', '2', '3'],
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];
}

export class CreateMovieResponse {
  @ApiProperty({
    description: 'ID of the movie',
    example: '123456',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Name of the movie',
    example: 'The matrix',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
