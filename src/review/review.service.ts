import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './review.schema';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel('Review') private readonly reviewModel: Model<Review>
    ){}

    async create(reviewDto: Review): Promise<Review> {
        return await new this.reviewModel(reviewDto).save();
    }

    async update(reviewId: string, reviewDto: Review): Promise<Review> {
        const review = await this.reviewModel.findByIdAndUpdate(reviewId, reviewDto, { new: true });
        if (!review) {
            throw new NotFoundException(`User #${reviewId} not found`);
        }
        return review;
    }

    async getAll(): Promise<Review[]> {
        const reviews = await this.reviewModel.find();
        if (!reviews) {
            throw new NotFoundException('Users data not found!');
        }
        return reviews;
    }

    async get(reviewId: string): Promise<Review> {
        const review = await this.reviewModel.findById(reviewId).exec();
        if (!review) {
            throw new NotFoundException(`Review #${reviewId} not found`);
        }
        return review;
    }

    async delete(reviewId: string): Promise<void> {
        const review = await this.reviewModel.findByIdAndDelete(reviewId);
        if (!review) {
            throw new NotFoundException(`Review #${reviewId} not found`);
        }
    }

}
