import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { ConsultingRequestDto } from './dto/consulting-request.dto';
import { ConsultingRequest } from './schemas/consulting-request.schema';
import { ConsultingRequestResponseDto } from './dto/consulting-request.response.dto';

@Injectable()
export class ConsultingRequestService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('ConsultingRequest') private readonly consultingRequestModel: Model<ConsultingRequest>
    ){}

    async create(consultingRequestDto: ConsultingRequestDto): Promise<ConsultingRequest>{
        const { name, sex, age, phone, consultingOption, applicationType, reason, desiredDate, score, uniInfo, reference, additionalInfo, routeKnown, refundAccount } = consultingRequestDto;
        const newUser = await new this.userModel({
            name,
            sex,
            age,
            phone
        }).save();
        return await new this.consultingRequestModel({
            user: newUser,
            score: score,
            uni: uniInfo,
            desiredDate: desiredDate,
            consultingOption: consultingOption,
            applicationType: applicationType,
            reason: reason,
            reference: reference,
            additionalInfo: additionalInfo,
            routeKnown: routeKnown,
            refundAccount: refundAccount
        }).save();
    }
    
    async update(requestId: string, requestDto: ConsultingRequestDto): Promise<ConsultingRequest> {
        const existingRequest = await this.consultingRequestModel.findByIdAndUpdate(requestId, requestDto, { new: true });
        if (!existingRequest) {
            throw new NotFoundException(`Score #${requestId} not found`);
        }
        return existingRequest;
    }

    async getAll(): Promise<ConsultingRequest[]> {
        const requests = await this.consultingRequestModel.find();
        if (!requests || requests.length == 0) {
            throw new NotFoundException('Consulting Requests data not found!');
        }
        return requests;
    }

    async get(requestId: string): Promise<ConsultingRequestResponseDto> {
        const existingRequest = await this.consultingRequestModel.findById(requestId).exec();
        if (!existingRequest) {
            throw new NotFoundException(`consulting request #${requestId} not found`);
        }
        const existingUser = await this.userModel.findById(existingRequest.user).exec();
        if (!existingUser) {
            throw new NotFoundException(`The User in consulting request #${requestId} not found`);
        }
        return new ConsultingRequestResponseDto(existingUser,existingRequest);
    }

    async getByUser(userId: string): Promise<ConsultingRequest[]> {
        const existingRequest = await this.consultingRequestModel.find({user: new Types.ObjectId(userId)}).exec();
        if (!existingRequest) {
            throw new NotFoundException(`Consulting Request in #${userId} not found`);
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

    async deleteByUser(userId: string): Promise<void>{
        await this.consultingRequestModel.deleteMany({user: new Types.ObjectId(userId)});
    }
}
