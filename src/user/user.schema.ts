import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, ObjectId, SchemaTypes, Types} from 'mongoose';

export type UserDocument = User & Document;

@Schema({versionKey: false})
export class User {
    @Prop({ required: true })
    name: String;
    @Prop({ required: true })
    sex: String;
    @Prop({ required: true })
    age: Number;
    @Prop({ required: true })
    phone: String;
}

export const UserSchema = SchemaFactory.createForClass(User);