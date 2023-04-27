import { ConflictException, Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ){}

    async create(user: User): Promise<User> {
        const existingUser = await this.userModel.find({email: user.email}).exec();
        if(existingUser.length !== 0) {
            throw new HttpException(
                '이미 존재하는 이메일입니다.',
                HttpStatus.BAD_REQUEST
            );
        }
        //password encryption
        await new this.userModel({
            ...user,
            password : await bcrypt.hash(user.password, 10)
        }).save();
        user.password = undefined;
        return user;
    }

    async findOne(email: string): Promise<User> {
        const user =  await this.userModel.findOne({email: email}).exec();
        if(!user) {
            throw new HttpException(
                '잘못된 사용자 정보입니다.',
                HttpStatus.BAD_REQUEST
            );
        }
        return user;
    }   
}
