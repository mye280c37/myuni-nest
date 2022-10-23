import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export type AdditionalInfoDocument = AdditionalInfo & Document;

@Schema({versionKey: false})
export class AdditionalInfo {
    @IsString()
    @Prop({ required: true })
    @ApiProperty({example: '2023 수능 응시자 필수 답변'})
    header: string;
    @IsString()
    @Prop({ required: true })
    @ApiProperty({example: '모의고사 등급을 작성해주세요.'})
    title: string;
    @IsString()
    @Prop({ required: true })
    @ApiProperty({example: '예시) 국어 1 영어 1 수학 1 한국사 1 사탐(세계지리 1 사회문화 1) 아랍어 1'})
    example: string;
}

export const AdditionalInfoSchema = SchemaFactory.createForClass(AdditionalInfo);