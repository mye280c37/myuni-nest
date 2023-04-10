import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('v2/user')
@ApiTags('User API')
export class UserController {
    constructor (private readonly userService: UserService){}

    @Post()
    @ApiOperation({ summary: 'user 생성 API', description: '새로운 유저를 생성한다.' })
    @ApiCreatedResponse({ description: '새로운 유저를 생성한다.', type: String })
    async create (@Res() response: Response, @Body() userDto: User) {
        try {
            const newUser = await this.userService.create(userDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                result: {
                    username: newUser.username,
                    email: newUser.email
                },
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not created!',
                error: err.message
            });
        }
    }
}
