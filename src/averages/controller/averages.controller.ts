import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/service/jwt/jwt.auth.guard";
import { RolesGuard } from "src/auth/service/rolesguard/roles.guard.service";
import { PostAverageService } from "../services/postAverages/service/postAverages.service";
import { PostAverageInputDto } from "../services/postAverages/dto/postAverageInput.dto";
import { PostAverageOutputDto } from "../services/postAverages/dto/postAverageOutput.dto";

@ApiTags('averages')
@UseGuards(JwtAuthGuard,RolesGuard) 
@Controller('averages')
export class AverageController {

    constructor(private readonly postAveragesService: PostAverageService) {}

    @Post()
    @ApiProperty({description: 'ADM ou Moderador pode postar notas para voluntários'})
    @ApiResponse({ status: 201, type: PostAverageOutputDto})
    async postAverage(@Body() dto: PostAverageInputDto, @Req() req: any): Promise<PostAverageOutputDto> {
        return await this.postAveragesService.postAverage(dto, req);
    }


}