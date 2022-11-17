import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AvailableDate } from './available-date.schema';

@Injectable()
export class AvailableDateService {
    constructor(
        @InjectModel('AvailableDate') private readonly availableDateModel: Model<AvailableDate>
    ){}

    async create(availableDate: AvailableDate): Promise<AvailableDate> {
        return await new this.availableDateModel(availableDate).save();
    }

    async update(dateId: string, availableDate: AvailableDate): Promise<AvailableDate> {
        const existingDate = await this.availableDateModel.findByIdAndUpdate(dateId, availableDate, { new: true });
        if (!existingDate) {
            throw new NotFoundException(`Student #${dateId} not found`);
        }
        return existingDate;
    }

    async getAll(): Promise<AvailableDate[]> {
        const availableDates = await this.availableDateModel.find();
        if (!availableDates) {
            throw new NotFoundException('AvailableDates data not found!');
        }
        return availableDates;
    }

    async get(dateId: string): Promise<AvailableDate> {
        const existingDate = await this.availableDateModel.findById(dateId).exec();
        if (!existingDate) {
            throw new NotFoundException(`AvailableDate #${dateId} not found`);
        }
        return existingDate;
    }

    async delete(dateId: string): Promise<AvailableDate> {
        const deletedDate = await this.availableDateModel.findByIdAndDelete(dateId);
        if (!deletedDate) {
            throw new NotFoundException(`AvailableDate #${dateId} not found`);
        }   
        return deletedDate;
    }

}
