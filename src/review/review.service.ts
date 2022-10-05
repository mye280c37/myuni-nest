import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewListItemDto } from './review-list-item.response.dto';
import { Review } from './review.schema';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel('Review') private readonly reviewModel: Model<Review>
    ){}

    async create(reviewDto: Review): Promise<ReviewListItemDto> {
        const review = await new this.reviewModel(reviewDto).save();
        return new ReviewListItemDto(review);
    }

    async update(reviewId: string, reviewDto: Review): Promise<ReviewListItemDto> {
        const existingReview = await this.reviewModel.findByIdAndUpdate(reviewId, reviewDto, { new: true });
        if (!existingReview) {
            throw new NotFoundException(`User #${reviewId} not found`);
        }
        return new ReviewListItemDto(existingReview);
    }

    async getAll(): Promise<ReviewListItemDto[]> {
        const reviews = await this.reviewModel.find();
        if (!reviews || reviews.length == 0) {
            throw new NotFoundException('Users data not found!');
        }
        return reviews.map(review => new ReviewListItemDto(review));
    }

    async get(reviewId: string): Promise<Review> {
        const existingReview = await this.reviewModel.findById(reviewId).exec();
        if (!existingReview) {
            throw new NotFoundException(`Review #${reviewId} not found`);
        }
        return existingReview;
    }

    async delete(reviewId: string): Promise<ReviewListItemDto> {
        const deletedReview = await this.reviewModel.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            throw new NotFoundException(`Review #${reviewId} not found`);
        }   
        return new ReviewListItemDto(deletedReview);
    }

}
