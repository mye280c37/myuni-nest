import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConverterDocument = Converter & Document;

@Schema({versionKey: false})
export class Converter {
    @Prop({ required: true })
    university: string;
    @Prop({ required: true })
    area: string;
    @Prop({ required: true })
    type: number;
    @Prop({ required: true })
    weight: Array<number>;
    @Prop({ required: true })
    standard: Array<number>;
    @Prop({ required: true })
    result: Array<number>;
    @Prop()
    func: string;
    @Prop({ required: true })
    link: string;
}

export const ConverterSchema = SchemaFactory.createForClass(Converter);