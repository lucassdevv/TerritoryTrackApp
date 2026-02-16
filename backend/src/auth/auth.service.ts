import { Injectable, NotFoundException } from '@nestjs/common';
import {  JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private prisma: PrismaService){}

    async validateUser (user: LoginDto){
        const foundUser = await this.prisma.userSystem.findUnique({
            where: {id: user.id},
        })

        if(!foundUser){return null}

        if(foundUser.hashedPassword === user.password){
            return this.jwtService.sign({
                id: foundUser.id,
                publisherId: foundUser.publisherId
            })
        }
    }

    
}
