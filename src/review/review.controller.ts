import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Review } from './review.schema';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('v2/review')
@ApiTags('Review API')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @Post()
    @ApiOperation({ summary: '리뷰 생성 API', description: '리뷰를 생성한다.' })
    @ApiCreatedResponse({ description: '리뷰를 생성한다.', type: String })
    async create (@Res() response: Response, @Body() reviewDto: Review) {
        try {
            const review = await this.reviewService.create(reviewDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Review has been created successfully',
                result: review,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Review not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('/:id')
    @ApiOperation({ summary: '리뷰 수정 API', description: '리뷰 데이터를 수정한다.' })
    async update (@Res() response: Response, @Param('id') reviewId: string, @Body() reviewDto: Review) {
        try {
            const review = await this.reviewService.update(reviewId, reviewDto);
            return response.status(HttpStatus.OK).json({
                message: 'Review has been successfully updated',
                result: review,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    @ApiOperation({ summary: '리뷰 리스트 API', description: '모든 리뷰 리스트를 가져온다.' })
    async getAll (@Res() response: Response) {
        try {
            const reviews = await this.reviewService.getAll();
            return response.status(HttpStatus.OK).json({
                message: 'All reviews data found successfully',
                result: reviews,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/admin')
    @ApiOperation({ summary: '관리자 리뷰 리스트 API', description: '모든 리뷰 리스트를 보안없이 가져온다.' })
    async getAllAdmin(@Res() response: Response) {
        try {
            const reviews = await this.reviewService.getAll(true);
            return response.status(HttpStatus.OK).json({
                message: 'All reviews data found successfully',
                result: reviews,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    @ApiOperation({ summary: '리뷰 GET API', description: '특정 리뷰 데이터 하나를 가져온다.' })
    async get (@Res() response, @Param('id') reviewId: string) {
        try {
            const review = await this.reviewService.get(reviewId);
            return response.status(HttpStatus.OK).json({
                message: 'Review found successfully',
                result: review,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    @ApiOperation({ summary: '리뷰 삭제 API', description: '자신이 작성한 리뷰 하나를 삭제한다.' })
    async delete (@Res() response: Response, @Param('id') reviewId: string)
    {
        try {
            const review = await this.reviewService.delete(reviewId);
            return response.status(HttpStatus.OK).json({
                message: 'Review deleted successfully',
                result: review,
            });
        }catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/admin/:id')
    @ApiOperation({ summary: '리뷰 삭제 API', description: '관리자 권한으로 리뷰 하나를 삭제한다.' })
    async deleteAdmin (@Res() response: Response, @Param('id') reviewId: string)
    {
        try {
            const review = await this.reviewService.delete(reviewId);
            return response.status(HttpStatus.OK).json({
                message: 'Review deleted successfully',
                result: review,
            });
        }catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

}
