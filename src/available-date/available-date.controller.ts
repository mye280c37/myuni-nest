import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AvailableDate } from './available-date.schema';
import { AvailableDateService } from './available-date.service';
import { Response } from 'express';


@Controller('v2/available-date')
@ApiTags('컨설팅 가능 날짜 API')
export class AvailableDateController {
    constructor(private readonly availableDateService: AvailableDateService) { }

    @Post()
    @ApiOperation({ summary: '신청 가능 날짜 생성 API', description: '컨설팅 신청 가능 날짜를 생성한다.' })
    @ApiCreatedResponse({ description: '신청 가능 날짜를 생성한다.', type: String })
    async create (@Res() response: Response, @Body() availableDateDto: AvailableDate) {
        try {
            const newDate = await this.availableDateService.create(availableDateDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Date has been created successfully',
                result: newDate,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Date not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('/:id')
    @ApiOperation({ summary: '신청 가능 날짜 수정 API', description: '컨설팅 신청 가능 날짜를 수정한다.' })
    async update (@Res() response: Response, @Param('id') dateId: string, @Body() availableDateDto: AvailableDate) {
        try {
            const existingDate = await this.availableDateService.update(dateId, availableDateDto);
            return response.status(HttpStatus.OK).json({
                message: 'Student has been successfully updated',
                result: existingDate,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    @ApiOperation({ summary: '신청 가능 날짜 리스트 API', description: '신청 가능 날짜 리스트를 가져온다.' })
    async getAll (@Res() response: Response) {
        try {
            const availableDates = await this.availableDateService.getAll();
            return response.status(HttpStatus.OK).json({
                message: 'All students data found successfully',
                result: availableDates,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    @ApiOperation({ summary: '신청 가능 날짜 GET API', description: '특정 신청 가능 날짜 하나를 가져온다.' })
    async get (@Res() response: Response, @Param('id') dateId: string) {
        try {
            const existingDate = await this.availableDateService.get(dateId);
            return response.status(HttpStatus.OK).json({
                message: 'Student found successfully',
                result: existingDate,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    @ApiOperation({ summary: '신청 가능 날짜 삭제 API', description: '특정 신청 가능 날짜 하나를 삭제한다.' })
    async delete (@Res() response: Response, @Param('id') dateId: string)
    {
        try {
            const deletedDate = await this.availableDateService.delete(dateId);
            return response.status(HttpStatus.OK).json({
                message: 'Date deleted successfully',
                result: deletedDate,
            });
        }catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
