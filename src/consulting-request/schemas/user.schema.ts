import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class User {
    @IsString()
    @ApiProperty({example: '아무개'})
    name: string;
    @IsString()
    @ApiProperty({example: 'm'})
    sex: string;
    @IsNumber()
    @ApiProperty({example: '19'})
    age: number;
    @IsString()
    @ApiProperty({example: '01011112222'})
    phone: string;
}