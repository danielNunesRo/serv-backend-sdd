import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/service/jwt/jwt.auth.guard";
import { RolesGuard } from "src/auth/service/rolesguard/roles.guard.service";
import { PostAverageService } from "../services/postAverages/service/postAverages.service";
import { PostAverageInputDto } from "../services/postAverages/dto/postAverageInput.dto";
import { PostAverageOutputDto } from "../services/postAverages/dto/postAverageOutput.dto";
import { GetMyAverageService } from "../services/getMyAverage/service/getMyAverage.service";
import { GetMyAverageOutputDto } from "../services/getMyAverage/dto/getMyAverageOutput.dto";
import { Roles } from "src/auth/service/decorator/roles.decorator";
import { Role } from "src/auth/service/enum/role.enum";

@ApiTags('averages')
@UseGuards(JwtAuthGuard,RolesGuard) 
@Controller('averages')
export class AverageController {

    constructor(private readonly postAveragesService: PostAverageService,
        private readonly getMyAverageService: GetMyAverageService
    ) {}

    @Get('/my')
    @Roles(Role.ADMINISTRADOR, Role.COMUM, Role.MODERADOR)
    @ApiProperty({description: 'As ultimas 5 médias do usuário'})
    @ApiResponse({ status: 200, type: GetMyAverageOutputDto, isArray: true})
    async getMyAverage(@Req() req: any): Promise<GetMyAverageOutputDto[]> {
        return await this.getMyAverageService.getMyAverage(req);
    }

    @Post()
    @ApiProperty({description: 'ADM ou Moderador pode postar notas para voluntários'})
    @ApiResponse({ status: 201, type: PostAverageOutputDto})
    async postAverage(@Body() dto: PostAverageInputDto, @Req() req: any): Promise<PostAverageOutputDto> {
        return await this.postAveragesService.postAverage(dto, req);
    }


}