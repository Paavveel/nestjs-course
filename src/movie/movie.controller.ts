import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieRequest, CreateMovieResponse } from './dto/movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Create movie',
  })
  @ApiOkResponse({
    description: 'Response with the created movie',
  })
  @Post()
  create(@Body() createMovieDto: CreateMovieRequest) {
    return this.movieService.create(createMovieDto);
  }

  @ApiOperation({
    summary: 'Get all movies',
    description: 'Get list of all movies',
  })
  @ApiOkResponse({
    description: 'Received movies',
    type: [CreateMovieResponse],
  })
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @ApiOperation({
    summary: 'Get movie by ID',
    description: 'Received info about the movie',
  })
  @ApiOkResponse({
    description: 'Info about the movie',
    type: CreateMovieResponse,
  })
  @ApiNotFoundResponse({
    description: 'Movie not found',
    example: {
      status: 404,
      message: 'Not Found',
      timestamp: '2026-04-17',
      path: '/movies/123',
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
