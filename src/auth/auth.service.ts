import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService,
        private jwtService: JwtService
    ){}

    async signIn(email: string, password: string): Promise<string> {
        const user = await this.userService.findOne(email);
        if (user.password !== password) {
            throw new UnauthorizedException(`Wrong Password`);
        }
        const payload = { username: user.username, sub: user.email };
        return await this.jwtService.signAsync(payload);
    }
}
