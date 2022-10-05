import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ReviewDocument } from "./review.schema";

export class ReviewListItemDto {

    constructor(review: ReviewDocument) {
        this._id = review._id;
        this.title = review.title;
        this.author = review.author;
        this.consultingTime = review.consultingTime;
    }

    @IsString()
    @ApiProperty({example: '63258760fd2ed6c49a6b6773'})
    _id: String;
    @IsString()
    @ApiProperty({example: '리뷰 제목'})
    title: String;
    @IsString()
    @ApiProperty({example: '작성자 이름'})
    author: String;
    @IsString()
    @ApiProperty({example: '2020-09-09T13:30'})
    consultingTime: String;
}