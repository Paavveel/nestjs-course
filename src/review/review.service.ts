import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const { movieId, text, rating } = createReviewDto;

    const review = await this.prismaService.review.create({
      data: { text, rating, movie: { connect: { id: movieId } } },
    });

    return review;
  }
}
