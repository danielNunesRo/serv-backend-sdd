import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PostFeedbackService } from "../services/postFeedback/service/postFeedback.service";
import { CreateFeedbackDto } from "../services/postFeedback/dto/createFeedback.dto";
import { RolesGuard } from "src/auth/service/rolesguard/roles.guard.service";
import { Roles } from "src/auth/service/decorator/roles.decorator";
import { Role } from "src/auth/service/enum/role.enum";
import { JwtAuthGuard } from "src/auth/service/jwt/jwt.auth.guard";
import { GetUsersFeedbackService } from "../services/getUsersFeedback/service/getUsersFeedback.service";
import { GetUserFeedbackOutputDto } from "../services/getUsersFeedback/dto/getUserFeedbackOutput.dto";

@ApiTags('feedbacks')
@UseGuards(JwtAuthGuard,RolesGuard) 
@Controller('feedbacks')
export class FeedbackController {

     constructor(private readonly postFeedbackService: PostFeedbackService, 
                private readonly getUsersFeedbackService: GetUsersFeedbackService) {}

    
    
    @Get() 
    @Roles(Role.ADMINISTRADOR, Role.MODERADOR, Role.COMUM)
    async getUsersFeedback(@Req() req:any):Promise<GetUserFeedbackOutputDto[]> {
      return await this.getUsersFeedbackService.getUsersFeedback(req.user.userId);
    }

    @Post()
    @Roles(Role.ADMINISTRADOR, Role.MODERADOR)
    async postFeedback(@Body() dto: CreateFeedbackDto, @Req() req: any): Promise<number> {
      console.log(req.user.userId);
      return this.postFeedbackService.postFeedback(dto, req);
      
    }




}
