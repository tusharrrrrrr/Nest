import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable()
export class AuthService{
    constructor(
        private prisma:PrismaService
        private config: ConfigService,
        ){}
        async signup(dto: AuthDto) {
            // generate the password hash
            const hash = await argon.hash(dto.password);
            // save the new user in the db
            
              const user = await this.prisma.user.create({
                data: {
                  email: dto.email,
                  hash,
                },
              });
          }
          async signin(dto: AuthDto) {
            // find the user by email
            const user = await this.prisma.user.findUnique({
                where: {
                  email: dto.email,
                },
              });
            // if user does not exist throw exception
            if (!user)
              throw new ForbiddenException(
                'Credentials incorrect',
              );
        
            // compare password
            const pwMatches = await argon.verify(
              user.hash,
              dto.password,
            );
            // if password incorrect throw exception
            if (!pwMatches)
              throw new ForbiddenException(
                'Credentials incorrect',
              );
            
          }
        
}