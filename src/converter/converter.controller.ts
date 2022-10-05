import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScoreConversionRequestDto } from './dto/score-conversion.request.dto';
import { ScoreConversionService } from './score-conversion.service';

@Controller('v2/converter')
@ApiTags('Converter API')
export class ConverterController {
    constructor(private readonly scoreConversionService: ScoreConversionService) { }

    @Get('/score')
    @ApiOperation({ summary: '내신 환산 API', description: '대학별 입력한 내신의 환산값을 반환한다.' })
    async getConversion (@Res() response, @Query('korean') korean: number, @Query('english') english: number, @Query('math') math: number, @Query('society') society: number, @Query('science') science: number,  @Query('history') history: number, @Query('select') select: number) {
        try {
            const conversions = await this.scoreConversionService.getByScore(new ScoreConversionRequestDto(korean, english, math, society, science,  history, select));
            return response.status(HttpStatus.CREATED).json({
                message: 'Conversions data are computed successfully',
                conversions,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Review not created!',
                error: 'Bad Request'
            });
        }
    }
}
