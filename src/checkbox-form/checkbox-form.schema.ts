import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import { IsBoolean, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export type CheckBoxFormDocument = CheckBoxForm & Document;

@Schema({versionKey: false})
export class CheckBoxForm {
    @IsArray()
    @Prop({ required: true })
    @ApiProperty({example: ['선택지1', '선택지2', '기타']})
    labels: Types.Array<string>;
    @IsBoolean()
    @Prop({ required: true })
    @ApiProperty({example: true})
    haveEtc: boolean;
}

export const CheckBoxFormSchema = SchemaFactory.createForClass(CheckBoxForm);