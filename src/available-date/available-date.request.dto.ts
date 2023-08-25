import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class AvailableDateRequestDto {

    constructor (dateList: string[]) {
        this.dateList = dateList;
    }

    @IsArray()
    @ApiProperty({example: []})
    dateList: string[];
}