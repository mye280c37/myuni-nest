import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SignInDto {
    
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    @IsEmail()
    @ApiProperty({example: 'email@email.com'})
    email: string;
    @IsString()
    @ApiProperty({example: 'a;sldsfijwoeif'})
    password: string;
}