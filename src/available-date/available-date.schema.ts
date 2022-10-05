import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, ObjectId, SchemaTypes, Types} from 'mongoose';

export type AvailableDateDocument = AvailableDate & Document;

@Schema({versionKey: false})
export class AvailableDate {
    @Prop({ required: true })
    date: String; // 'YYYY-MM-DD'
    @Prop({ required: true })
    timeFrom: String;
    @Prop({ required: true })
    timeTo: String;
}

export const AvailableDateSchema = SchemaFactory.createForClass(AvailableDate);