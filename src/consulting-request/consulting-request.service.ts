import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ConsultingRequest } from './schemas/consulting-request.schema';

@Injectable()
export class ConsultingRequestService {
    constructor(
        @InjectModel('ConsultingRequest') private readonly consultingRequestModel: Model<ConsultingRequest>
    ){}

    async create(consultingRequest: ConsultingRequest): Promise<ConsultingRequest>{
        return await new this.consultingRequestModel(consultingRequest).save();
    }
    
    async update(requestId: string, consultingRequest: ConsultingRequest): Promise<ConsultingRequest> {
        const existingRequest = await this.consultingRequestModel.findByIdAndUpdate(requestId, consultingRequest, { new: true });
        if (!existingRequest) {
            throw new NotFoundException(`Score #${requestId} not found`);
        }
        return existingRequest;
    }

    async getAll(): Promise<ConsultingRequest[]> {
        const requests = await this.consultingRequestModel.find();
        return requests;
    }

    async get(requestId: string): Promise<ConsultingRequest> {
        const existingRequest = await this.consultingRequestModel.findById(requestId).exec();
        if (!existingRequest) {
            throw new NotFoundException(`consulting request #${requestId} not found`);
        }
        return existingRequest;
    }

    async delete(requestId: string): Promise<ConsultingRequest> {
        const deletedRequest = await this.consultingRequestModel.findByIdAndDelete(requestId);
        if (!deletedRequest) {
            throw new NotFoundException(`Consulting Request #${requestId} not found`);
        }   
        return deletedRequest;
    }
}
