import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export type AvailableDateDocument = AvailableDate & Document;

@Schema({versionKey: false})
export class AvailableDate {
    @IsString()
    @Prop({ required: true })
    @ApiProperty({example: '2022-09-21 13:00~14:00'})
    date: string; // 'YYYY-MM-DD;
}

export const AvailableDateSchema = SchemaFactory.createForClass(AvailableDate);