import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async register({name, email, password}: RegisterDto) {

        const user = await this.usersService.findByEmail(email);

        if (user) {
            throw new BadRequestException('User already exists');
        }

        try {
            return await this.usersService.create({
                name, 
                email, 
                password: await bcryptjs.hash(password, 10)
            });
        } catch (error) {
            console.error(error);
            throw new BadRequestException('Error creating user');
        }
    }

    async login({email, password}: LoginDto) {

        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Email or password incorrect');
        }

        if (!bcryptjs.compare(password, user.password)) {
            throw new UnauthorizedException('Email or password incorrect');
        }

        const payload = { email: user.email };
        const token = await this.jwtService.signAsync(payload);


        return {
            access_token: token,
            email
        }
    }
}
