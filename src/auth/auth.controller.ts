import { Body, Controller, Post, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './signin.dto';

@Controller('v2/auth')
@ApiTags('Auth API')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '로그인 API' })
    @ApiCreatedResponse({ description: '새로운 유저를 생성한다.', type: String })
    @Post('login')
    async signIn(@Res() response: Response, @Body() signInDto: SignInDto) {
        try {
            const accessToken = await this.authService.signIn(signInDto.email, signInDto.password);

            return response.status(HttpStatus.ACCEPTED).json({
                message: 'User has been logined successfully',
                result: {
                    accessToken: accessToken
                },
            });
        }catch(err) {
            return response.status(err.status?err.status:HttpStatus.SERVICE_UNAVAILABLE).json(err.message);
        }
    }
}
