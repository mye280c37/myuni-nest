import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review, ReviewSchema } from './review.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Review.name, schema: ReviewSchema}
  ])],
  providers: [ReviewService],
  controllers: [ReviewController]
})
export class ReviewModule {}
