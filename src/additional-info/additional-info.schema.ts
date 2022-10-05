import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, ObjectId, SchemaTypes, Types} from 'mongoose';

export type AdditionalInfoDocument = AdditionalInfo & Document;

@Schema({versionKey: false})
export class AdditionalInfo {
    @Prop({ required: true })
    header: String;
    @Prop({ required: true })
    title: String;
    @Prop({ required: true })
    example: String;
}

export const AdditionalInfoSchema = SchemaFactory.createForClass(AdditionalInfo);