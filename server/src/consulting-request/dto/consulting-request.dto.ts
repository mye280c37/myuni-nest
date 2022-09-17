import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsObject, Min, Max, IsArray } from "class-validator";

class ConsultingRequestScoreDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({example: 87})
  korean: Number;
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({example: 87})
  english: Number;
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({example: 87})
  math: Number;
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({example: 87})
  society: Number;
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({example: 87})
  science: Number;
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({example: 87})
  history: Number;
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({example: 87})
  optional: Number;
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({example: 87})
  average: Number;
}

class ConsultingRequestDesiredUniDto {
  @IsObject()
  @ApiProperty({example: {university: '서강대학교', major: '컴퓨터공학과'}})
  1: Record<string, any>;
  @IsObject()
  @ApiProperty({example: {university: '서강대학교', major: '컴퓨터공학과'}})
  2: Record<string, any>;
  @IsObject()
  @ApiProperty({example: {university: '서강대학교', major: '컴퓨터공학과'}})
  3: Record<string, any>;
  @IsObject()
  @ApiProperty({example: {university: '서강대학교', major: '컴퓨터공학과'}})
  4: Record<string, any>;
  @IsObject()
  @ApiProperty({example: {university: '서강대학교', major: '컴퓨터공학과'}})
  5: Record<string, any>;
  @IsObject()
  @ApiProperty({example: {university: '서강대학교', major: '컴퓨터공학과'}})
  6: Record<string, any>;
  @IsString()
  @ApiProperty({example: '희망 대학 지원 이유'})
  reason: String;
}

class ConsultingRequestAdditionalInfo {
  @IsString()
  @ApiProperty({example: '2023 수능 응시자 필수 답변'})
  header: String;
  @IsString()
  @ApiProperty({example: '모의고사 등급을 작성해주세요.'})
  title: String;
  @IsString()
  @ApiProperty({example: '예시) 국어 1 영어 1 수학 1 한국사 1 사탐(세계지리 1 사회문화 1) 아랍어 1'})
  value: String;
}

export class ConsultingRequestDto {
    @IsString()
    @ApiProperty({example: '아무개'})
    name: String;
    @IsString()
    @ApiProperty({example: 'm'})
    sex: String;
    @IsNumber()
    @ApiProperty({example: 19})
    age: Number;
    @IsString()
    @ApiProperty({example: '010-0000-0000'})
    phone: String;
    @IsArray()
    @ApiProperty({example: ['수시지원', '자기소개서 컨설팅']})
    consultingOption: Array<String>;
    @IsArray()
    @ApiProperty({example: ['학생부 교과(검정고시 성적)', '학생부 교과 면접(검정고시 성적 + 면접)']})
    applicationType: Array<String>;
    @IsString()
    @ApiProperty({example: '컨설팅 지원 전형 선택 이유'})
    reason: String;
    @IsString()
    @ApiProperty({example: '2022-09-15 14:00~15:00'})
    desiredDate: String;
    @IsObject()
    @ApiProperty({example: ConsultingRequestScoreDto})
    score: ConsultingRequestScoreDto;
    @IsObject()
    @ApiProperty({example: ConsultingRequestDesiredUniDto})
    uniInfo: ConsultingRequestDesiredUniDto;
    @IsString()
    @ApiProperty({example: '참고사항'})
    reference: String;
    @IsArray()
    @IsObject({each: true})
    @ApiProperty({type: Array<ConsultingRequestAdditionalInfo>, example: [{header: '2023 수능 응시자 필수 답변', title: '모의고사 등급을 작성해주세요.', value: '예시) 국어 1 영어 1 수학 1 한국사 1 사탐(세계지리 1 사회문화 1) 아랍어 1'}]})
    additionalInfo: Array<ConsultingRequestAdditionalInfo>;
    @IsArray()
    @IsString({each: true})
    @ApiProperty({example: ['센터 대학입시 설명회']})
    routeKnown: Array<String>;
    @IsString()
    @ApiProperty({example: '1002-857-123456 00은행 아무개'})
    refundAccount: String;
  }