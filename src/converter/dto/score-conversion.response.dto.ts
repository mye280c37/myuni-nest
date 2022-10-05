import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { ConverterDocument } from "../converter.schema";

export class ScoreConversionResponseDto {
    
    constructor(converter: ConverterDocument, converted: number) {
        this.university = converter.university;
        this.area = converter.area;
        this.converted = converted;
        this.link = converter.link;
    }

    @IsString()
    @ApiProperty({example: '서강대학교'})
    university: string;
    @IsString()
    @ApiProperty({example: '서울/경기'})
    area: string;
    @IsNumber()
    @ApiProperty({example: '322.6'})
    converted: number;
    @IsString()
    @ApiProperty({example: 'url'})
    link: string;
}