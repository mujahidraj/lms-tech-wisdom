import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(private config: ConfigService, private database: DatabaseService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }
    async validate (payload : {
        
        
        sub : number ;
        username: string;
        
        
    }) {
        const user = await this.database.student.findUnique({
            where : {
                
                username :payload.username,
            },
        });
        delete user.hash;
        return user ;
    }

}