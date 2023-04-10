import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export type UserDocument = User & Document;

@Schema({versionKey: false})
export class User {
    @Prop({required: true})
    @IsString()
    @ApiProperty({example: '작성자'})
    username: string;
    @Prop({required: true})
    @IsEmail()
    @ApiProperty({example: 'email@email.com'})
    email: string;
    @Prop({required: true})
    @IsString()
    @ApiProperty({example: 'a;sldsfijwoeif'})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);