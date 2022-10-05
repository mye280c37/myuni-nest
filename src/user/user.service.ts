import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ){}

    async create(userDto: UserDto): Promise<User> {
        return await new this.userModel(userDto).save();
    }

    async update(userId: string, userDto: UserDto): Promise<User> {
        const existingUser = await this.userModel.findByIdAndUpdate(userId, userDto, { new: true });
        if (!existingUser) {
            throw new NotFoundException(`User #${userId} not found`);
        }
        return existingUser;
    }

    async getAll(): Promise<User[]> {
        const users = await this.userModel.find();
        if (!users || users.length == 0) {
            throw new NotFoundException('Users data not found!');
        }
        return users;
    }

    async get(userId: string): Promise<User> {
        const existingUser = await this.userModel.findById(userId).exec();
        if (!existingUser) {
            throw new NotFoundException(`AvailableDate #${userId} not found`);
        }
        return existingUser;
    }

    async delete(userId: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new NotFoundException(`AvailableDate #${userId} not found`);
        }   
        return deletedUser;
    }

}
