import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AvailableDateDto } from './available-date.dto';
import { AvailableDate } from './available-date.schema';

@Injectable()
export class AvailableDateService {
    constructor(
        @InjectModel('AvailableDate') private readonly availableDateModel: Model<AvailableDate>
    ){}

    async create(availableDateDto: AvailableDateDto): Promise<AvailableDate> {
        const newDate = await new this.availableDateModel(availableDateDto);
        return newDate.save();
    }

    async update(dateId: string, availableDateDto: AvailableDateDto): Promise<AvailableDate> {
        const existingDate = await this.availableDateModel.findByIdAndUpdate(dateId, availableDateDto, { new: true });
        if (!existingDate) {
            throw new NotFoundException(`Student #${dateId} not found`);
        }
        return existingDate;
    }

    async getAll(): Promise<AvailableDate[]> {
        const availableDates = await this.availableDateModel.find();
        if (!availableDates || availableDates.length == 0) {
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
