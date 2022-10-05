import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AdditionalInfoDto {
    @IsString()
    header: String;
    @IsString()
    title: String;
    @IsString()
    example: String;
}