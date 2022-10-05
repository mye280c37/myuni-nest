import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsString } from "class-validator";

export class DesiredUni {
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