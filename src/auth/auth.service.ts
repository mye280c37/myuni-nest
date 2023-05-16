import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.schema';

import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService,
        private jwtService: JwtService,
        private readonly configService: ConfigService
    ){}

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException('잘못된 인증 정보입니다.', HttpStatus.BAD_REQUEST);
        }
    }

    async validateUser(email: string, password: string): Promise<User> {
        try{
            const user = await this.userService.findOne(email);
            await this.verifyPassword(password, user.password);
            return user;
        }
        catch(err) {
            throw new HttpException(
                '잘못된 사용자 정보입니다.',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async getCookieWithJwtToken(user: User): Promise<string> {
        const payload: TokenPayload = { username: user.username, sub: user.email };
        const token = await this.jwtService.signAsync(payload);
        let expiredDate = new Date();
        expiredDate.setHours(expiredDate.getHours()+2);
        // return `Authentication=${token}; HttpOnly; Path=/; Expires=${expiredDate.toUTCString()};`;
        return `Authentication=${token}; Path=/; Expires=${expiredDate.toUTCString()};`;
    }

    async getJwtToken (user: User): Promise<string> {
        const payload: TokenPayload = { username: user.username, sub: user.email };
        return await this.jwtService.signAsync(payload);
    }

    async signIn(email: string, password: string): Promise<string> {
        try{
            const user = await this.validateUser(email, password);
            return await this.getCookieWithJwtToken(user);
        }catch(err) {
            throw new HttpException(
                '서버 오류가 발생했습니다.',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    public getCookieForLogOut(): string {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}
