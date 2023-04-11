import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService,
        private jwtService: JwtService
    ){}

    async signIn(email: string, password: string): Promise<string> {
        try{
            const user = await this.userService.findOne(email);
            if (user.password !== password) {
                throw new HttpException(
                    "잘못된 사용자 정보입니다.",
                    HttpStatus.BAD_REQUEST
                );
            }
            const payload = { username: user.username, sub: user.email };
            return await this.jwtService.signAsync(payload);
        }catch(err) {
            throw new HttpException(
                '서버 오류가 발생했습니다.',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
