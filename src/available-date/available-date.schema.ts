import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export type AvailableDateDocument = AvailableDate & Document;

@Schema({versionKey: false})
export class AvailableDate {
    @IsString()
    @Prop({ required: true })
    @ApiProperty({example: '2022-09-21'})
    date: string; // 'YYYY-MM-DD'
    @IsString()
    @Prop({ required: true })
    @ApiProperty({example: '13:00'})
    timeFrom: string;
    @IsString()
    @Prop({ required: true })
    @ApiProperty({example: '14:00'})
    timeTo: string;
}

export const AvailableDateSchema = SchemaFactory.createForClass(AvailableDate);