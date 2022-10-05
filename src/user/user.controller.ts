import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('v2/user')
@ApiTags('User API')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
    @ApiCreatedResponse({ description: '유저를 생성한다.', type: String })
    async create (@Res() response, @Body() userDto: UserDto) {
        try {
            const user = await this.userService.create(userDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                user,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('/:id')
    @ApiOperation({ summary: 'User 수정 API', description: 'User 데이터를 수정한다.' })
    async update (@Res() response, @Param('id') userId: string, @Body() userDto: UserDto) {
        try {
            const user = await this.userService.update(userId, userDto);
            return response.status(HttpStatus.OK).json({
                message: 'User has been successfully updated',
                user,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    @ApiOperation({ summary: '유저 리스트 API', description: '모든 유저 리스트를 가져온다.' })
    async getAll (@Res() response) {
        try {
            const users = await this.userService.getAll();
            return response.status(HttpStatus.OK).json({
                message: 'All users data found successfully',
                users,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'User GET API', description: '특정 유저 데이터 하나를 가져온다.' })
    async get (@Res() response, @Param('id') userId: string) {
        try {
            const user = await this.userService.get(userId);
            return response.status(HttpStatus.OK).json({
                message: 'User found successfully',
                user,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    @ApiOperation({ summary: '유저 삭제 API', description: '특정 유저 하나를 삭제한다.' })
    async delete (@Res() response, @Param('id') userId: string)
    {
        try {
            const user = await this.userService.delete(userId);
            return response.status(HttpStatus.OK).json({
                message: 'User deleted successfully',
                user,
            });
        }catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
