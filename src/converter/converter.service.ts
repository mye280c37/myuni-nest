import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScoreConversionRequestDto } from './dto/score-conversion.request.dto';
import { Converter } from './converter.schema';

@Injectable()
export class ConverterService {
    constructor(
        @InjectModel('Converter') private readonly converterModel: Model<Converter>,
    ){}

    async update(conversionId: string, scoreConversionReqDto: ScoreConversionRequestDto): Promise<Converter> {
        const existingConversion = await this.converterModel.findByIdAndUpdate(conversionId, scoreConversionReqDto, { new: true });
        if (!existingConversion) {
            throw new NotFoundException(`Score #${conversionId} not found`);
        }
        return existingConversion;
    }

    async getAll(): Promise<Converter[]> {
        const conversions = await this.converterModel.find();
        if (!conversions || conversions.length == 0) {
            throw new NotFoundException('Conversions data not found!');
        }
        return conversions;
    }

    async get(conversionId: string): Promise<Converter> {
        const existingConversion = await this.converterModel.findById(conversionId).exec();
        if (!existingConversion) {
            throw new NotFoundException(`Conversion #${conversionId} not found`);
        }
        return existingConversion;
    }

    async delete(conversionId: string): Promise<Converter> {
        const deletedScore = await this.converterModel.findByIdAndDelete(conversionId);
        if (!deletedScore) {
            throw new NotFoundException(`Conversion #${conversionId} not found`);
        }   
        return deletedScore;
    }

}
