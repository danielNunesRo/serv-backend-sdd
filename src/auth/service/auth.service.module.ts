import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./jwt/strategy.jwt";
import { JwtAuthGuard } from "./jwt/jwt.auth.guard";
import { AuthRepository } from "./auth.repository";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "./auth.service";


@Module({
    imports: [DatabaseModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: process.env.SECRET_KEY, 
                signOptions: { expiresIn: '60m' }, 
            }),
            inject: [ConfigService],
        })
    ],
    exports: [], 
    providers: [AuthService,AuthRepository,JwtStrategy, JwtAuthGuard],
    controllers: [AuthController],
})

export class AuthServiceModule {}