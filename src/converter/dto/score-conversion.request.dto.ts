import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min, Max } from "class-validator";

export class ScoreConversionRequestDto {

    constructor (korean: number, english: number, math: number, society: number, science: number,  history: number, select: number) {
        this.korean = korean;
        this.english = english;
        this.math = math;
        this.society = society;
        this.science = science;
        this.history = history;
        this.select = select;
    }

    @IsNumber()
    @Min(0)
    @Max(100)
    @ApiProperty({example: 87})
    korean: number;
    @IsNumber()
    @Min(0)
    @Max(100)
    @ApiProperty({example: 87})
    english: number;
    @IsNumber()
    @Min(0)
    @Max(100)
    @ApiProperty({example: 87})
    math: number;
    @IsNumber()
    @Min(0)
    @Max(100)
    @ApiProperty({example: 87})
    society: number;
    @IsNumber()
    @Min(0)
    @Max(100)
    @ApiProperty({example: 87})
    science: number;
    @IsNumber()
    @Min(0)
    @Max(100)
    @ApiProperty({example: 87})
    history: number;
    @IsNumber()
    @Min(0)
    @Max(100)
    @ApiProperty({example: 87})
    select: number;
}