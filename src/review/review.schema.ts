import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export type ReviewDocument = Review & Document;

@Schema({versionKey: false})
export class Review {
    @Prop({required: true})
    @IsString()
    @ApiProperty({example: '작성자'})
    author: string;
    @Prop({required: true})
    @IsString()
    @ApiProperty({example: '2020-09-08T14:30'})
    consultingTime: string;
    @Prop({required: true})
    @IsString()
    @ApiProperty({example: '후기 제목'})
    title: string;
    @Prop({required: true})
    @IsString()
    @ApiProperty({example: '후기 내용'})
    body: string;
    @Prop({required: true})
    @IsString()
    @ApiProperty({example: '1234'})
    password: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);