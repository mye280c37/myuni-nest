import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConsultingRequestService } from './consulting-request.service';
import { Response } from 'express';
import { ConsultingRequest } from './schemas/consulting-request.schema';

@Controller('v2/consulting-request')
@ApiTags('컨설팅 신청 API')
export class ConsultingRequestController {
    constructor(private readonly consultingRequestService: ConsultingRequestService) {}

    @Post()
    @ApiOperation({ summary: '컨설팅 신청 생성 API', description: '컨설팅 신청 데이터를 생성한다.' })
    @ApiCreatedResponse({ description: '컨설팅 신청 데이터를 생성한다.', type: String })
    async create (@Res() response: Response, @Body() request: ConsultingRequest) {
        try {
            const consultingRequest = await this.consultingRequestService.create(request);
            return response.status(HttpStatus.CREATED).json({
                message: 'Consulting Request has been created successfully',
                result: consultingRequest,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Consulting Request not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('/:id')
    @ApiOperation({ summary: '컨설팅 신청 수정 API', description: '컨설팅 신청 데이터를 수정한다.' })
    async update (@Res() response: Response, @Param('id') requestId: string, @Body() request: ConsultingRequest) {
        try {
            const consultingRequest = await this.consultingRequestService.update(requestId, request);
            return response.status(HttpStatus.OK).json({
                message: 'Consulting Request has been successfully updated',
                result: consultingRequest,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    @ApiOperation({ summary: '컨설팅 신청 리스트 API', description: '모든 컨설팅 신청 리스트를 가져온다.' })
    async getAll (@Res() response: Response) {
        try {
            const consultingRequests = await this.consultingRequestService.getAll();
            return response.status(HttpStatus.OK).json({
                message: 'All consulting request data found successfully',
                result: consultingRequests,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    @ApiOperation({ summary: '컨설팅 신청 GET API', description: '특정 컨설팅 신청 데이터 하나를 가져온다.' })
    async get (@Res() response: Response, @Param('id') requestId: string) {
        try {
            const consultingRequest = await this.consultingRequestService.get(requestId);
            return response.status(HttpStatus.OK).json({
                message: 'Consulting Request found successfully',
                result: consultingRequest,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    @ApiOperation({ summary: '컨설팅 신청 데이터 삭제 API', description: '특정 컨설팅 신청 데이터 하나를 삭제한다.' })
    async delete (@Res() response: Response, @Param('id') uniId: string)
    {
        try {
            const consultingRequest = await this.consultingRequestService.delete(uniId);
            return response.status(HttpStatus.OK).json({
                message: 'Desired Uni deleted successfully',
                result: consultingRequest,
            });
        }catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
