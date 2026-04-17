import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieRequest } from './dto/movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from '../../prisma/generated/prisma/client';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createMovieDto: CreateMovieRequest): Promise<Movie> {
    const { title, releaseYear, actorIds, imageUrl } = createMovieDto;

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: actorIds },
      },
    });

    if (!actors || !actors.length) {
      throw new NotFoundException('One or more actors not found');
    }

    const movie = await this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        poster: imageUrl
          ? {
              create: {
                url: imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({ id: actor.id })),
        },
      },
    });

    return movie;
  }

  async findAll() {
    return this.prismaService.movie.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        actors: { select: { id: true, name: true } },
      },
    });
  }

  async findById(id: string) {
    const movie = await this.prismaService.movie.findUnique({
      where: {
        id,
      },
      include: { actors: true, poster: true, reviews: true },
    });

    if (!movie || !movie.isAvailable) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findById(id);

    await this.prismaService.movie.update({
      where: { id: movie.id },
      data: updateMovieDto,
    });

    return true;
  }

  async remove(id: string) {
    const movie = await this.findById(id);

    await this.prismaService.movie.delete({
      where: { id: movie.id },
    });

    return movie.id;
  }
}
