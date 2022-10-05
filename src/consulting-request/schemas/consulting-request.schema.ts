import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, ObjectId, SchemaTypes, Types} from 'mongoose';
import { Score } from './score.schema';
import { User } from 'src/user/user.schema';
import { AdditionalInfoForm } from './additional-info-form.schema';
import { DesiredUni } from './desired-uni.schema';

export type ConsultingRequestDocument = ConsultingRequest & Document;

@Schema({versionKey: false})
export class ConsultingRequest {
    @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'User' })
    user: User;
    @Prop({ required: true })
    score: Score;
    @Prop({ required: true })
    uni: DesiredUni;
    @Prop({required: true})
    desiredDate: String;
    @Prop({required: true})
    consultingOption: Array<String>;
    @Prop({required: true})
    applicationType: Array<String>;
    @Prop({required: true})
    reason: String;
    @Prop({required: true})
    reference: String;
    @Prop({required: true})
    additionalInfo: AdditionalInfoForm;
    @Prop({required: true})
    routeKnown: Array<String>;
    @Prop({ required: true })
    refundAccount: String;
}

export const ConsultingRequestSchema = SchemaFactory.createForClass(ConsultingRequest);