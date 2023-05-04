import { Body, Controller, Get, Post, HttpCode, HttpStatus, UseGuards, Req, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './signin.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import RequestWithUser from './requestWithUser.interface';

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
            const cookie = await this.authService.signIn(signInDto.email, signInDto.password);
            response.setHeader('Set-Cookie', cookie);

            return response.status(HttpStatus.ACCEPTED).json({
                message: 'User has been logined successfully',
                result: {
                    email: signInDto.email
                },
            });
        }catch(err) {
            return response.status(err.status?err.status:HttpStatus.SERVICE_UNAVAILABLE).json(err.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
        response.setHeader(
            'Set-Cookie',
            this.authService.getCookieForLogOut(),
        );
        return response.sendStatus(200);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        user.password = undefined;
        return user;
    }
}
