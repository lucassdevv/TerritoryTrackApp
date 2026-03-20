import { Injectable } from '@nestjs/common';
import {  JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private prisma: PrismaService){}

    async validateUser (user: LoginDto){
        const foundUser = await this.prisma.userSystem.findUnique({
            where: {id: user.id},
            include: {
                publisher: {
                    include: { role: true }
                }
            }
        })

        if(!foundUser){return null}

        const isMatch = await bcrypt.compare(user.password, foundUser.hashedPassword);

        if(isMatch){
            return this.jwtService.sign({
                id: foundUser.id,
                publisherId: foundUser.publisherId,
                roleName: foundUser.publisher.role.roleName
            })
        }
        return null;
    }

    
}
