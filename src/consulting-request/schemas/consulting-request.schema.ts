import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, ObjectId, SchemaTypes, Types} from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsObject, IsArray } from "class-validator";
import { Score } from './score.schema';
import { User } from './user.schema';
import { AdditionalInfoForm } from './additional-info-form.schema';
import { DesiredUni } from './desired-uni.schema';

export type ConsultingRequestDocument = ConsultingRequest & Document;

@Schema({versionKey: false})
export class ConsultingRequest {
    @IsObject()
    @Prop({ required: true })
    user: User;
    @IsObject()
    @Prop({ required: true })
    score: Score;
    @IsObject()
    @Prop({ required: true })
    uni: DesiredUni;
    @IsString()
    @Prop({required: true})
    @ApiProperty({example: '2022-09-15 14:00~15:00'})
    desiredDate: string;
    @IsString()
    @Prop({required: true})
    @ApiProperty({example: ['수시지원', '자기소개서 컨설팅']})
    consultingOption: Array<string>;
    @IsArray()
    @Prop({required: true})
    @ApiProperty({example: ['학생부 교과(검정고시 성적)', '학생부 교과 면접(검정고시 성적 + 면접)']})
    applicationType: Array<string>;
    @IsString()
    @Prop({required: true})
    @ApiProperty({example: '컨설팅 지원 전형 선택 이유'})
    reason: string;
    @IsString()
    @Prop({required: true})
    @ApiProperty({example: '참고사항'})
    reference: string;
    @IsObject()
    @Prop({required: true})
    @ApiProperty({type: Array<AdditionalInfoForm>, example: [{header: '2023 수능 응시자 필수 답변', title: '모의고사 등급을 작성해주세요.', value: '국어 1 영어 1 수학 1 한국사 1 사탐(세계지리 1 사회문화 1) 아랍어 1'}]})
    additionalInfo: AdditionalInfoForm;
    @IsArray()
    @Prop({required: true})
    @ApiProperty({example: ['센터 대학입시 설명회']})
    routeKnown: Array<string>;
    @IsString()
    @Prop({ required: true })
    @ApiProperty({example: '1002-857-123456 00은행 아무개'})
    refundAccount: string;
}

export const ConsultingRequestSchema = SchemaFactory.createForClass(ConsultingRequest);