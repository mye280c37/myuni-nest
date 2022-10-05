import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, ObjectId, SchemaTypes, Types} from 'mongoose';

export type CheckBoxFormDocument = CheckBoxForm & Document;

@Schema({versionKey: false})
export class CheckBoxForm {
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId;
    @Prop({ required: true })
    labels: Types.Array<String>;
    @Prop({ required: true })
    haveEtc: Boolean;
}

export const CheckBoxFormSchema = SchemaFactory.createForClass(CheckBoxForm);