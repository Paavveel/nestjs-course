import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieRequest } from './movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieRequest) {}
