import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min, Max } from "class-validator";

export class Score {
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
    optional: number;
    @IsNumber()
    @Min(0)
    @Max(100)
    @ApiProperty({example: 87})
    average: number;
}