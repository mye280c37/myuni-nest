import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min, Max } from "class-validator";

export class Score {
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