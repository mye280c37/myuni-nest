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
    author: String;
    @Prop({required: true})
    @IsString()
    @ApiProperty({example: '2020-09-08T14:30'})
    consultingTime: String;
    @Prop({required: true})
    @IsString()
    @ApiProperty({example: '후기 제목'})
    title: String;
    @Prop({required: true})
    @IsString()
    @ApiProperty({example: '후기 내용'})
    body: String;
    @Prop({required: true})
    @IsString()
    @ApiProperty({example: '1234'})
    password: String;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);