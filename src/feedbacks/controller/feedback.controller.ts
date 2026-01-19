import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiParam, ApiProperty, ApiTags } from "@nestjs/swagger";
import { PostFeedbackService } from "../services/postFeedback/service/postFeedback.service";
import { CreateFeedbackDto } from "../services/postFeedback/dto/createFeedback.dto";
import { RolesGuard } from "src/auth/service/rolesguard/roles.guard.service";
import { Roles } from "src/auth/service/decorator/roles.decorator";
import { Role } from "src/auth/service/enum/role.enum";
import { JwtAuthGuard } from "src/auth/service/jwt/jwt.auth.guard";
import { GetUsersFeedbackService } from "../services/getUsersFeedback/service/getUsersFeedback.service";
import { GetUserFeedbackOutputDto } from "../services/getUsersFeedback/dto/getUserFeedbackOutput.dto";
import { GetMessageFeedbackService } from "../services/getMessageFeedback/service/getMessageFeedback.service";
import { GetMessageFeedbackOutputDto } from "../services/getMessageFeedback/dto/getMessageFeedbackOutput.dto";
import { PostMessageFeedbackService } from "../services/postMessageFeedback/service/postMessageFeedback.service";
import { PostMessageFeedbackOutputDto } from "../services/postMessageFeedback/dto/postMessageFeedbackOutput.dto";
import { GetAllFeedbacksService } from "../services/getFeedbacks/service/getFeedbacks.service";
import { GetAllMessagesFeedbackService } from "../services/getAllMessageFeedback/service/getAllMessageFeedback.service";

@ApiTags('feedbacks')
@UseGuards(JwtAuthGuard,RolesGuard) 
@Controller('feedbacks')
export class FeedbackController {

     constructor(private readonly postFeedbackService: PostFeedbackService, 
                private readonly getUsersFeedbackService: GetUsersFeedbackService,
                private readonly getMessageFeedbackService: GetMessageFeedbackService,
                private readonly postMessageFeedbackService: PostMessageFeedbackService,
                private readonly getFeedbacks: GetAllFeedbacksService,
                private readonly getAllMessages: GetAllMessagesFeedbackService) {}

    @Get('/admin') 
    @Roles(Role.ADMINISTRADOR, Role.MODERADOR)
    @ApiProperty({description: 'Recupera todos os feedbacks do site'})
    async getAllFeedbacks() {
      return await this.getFeedbacks.getAllFeedbacks();
    }

    @Get('/admin/messages/:id') 
    @Roles(Role.ADMINISTRADOR, Role.MODERADOR)
    @ApiProperty({description: 'Recupera todas mensagens de um unico feedback'})
    async getAllMessagesFeedbacks(@Param('id') feedbackId: number) {
      return await this.getAllMessages.getAllMessageFeedback(feedbackId);
    }

    
    @Get('/:id/messages') 
    @Roles(Role.ADMINISTRADOR, Role.MODERADOR, Role.COMUM)
    @ApiProperty({description: 'Recupera mensagens a partir do ID do Feedback'})
    @ApiParam({ name: 'id', description: 'ID do feedback', type: Number })
    async getMessageFeedback(@Param('id') feedbackId: number, @Req() req: any):Promise<GetMessageFeedbackOutputDto[]> {
      return await this.getMessageFeedbackService.getMessageFeedbackService(feedbackId, req);
    }


    @Get() 
    @Roles(Role.ADMINISTRADOR, Role.MODERADOR, Role.COMUM)
    @ApiProperty({description: 'Busca todos os feedbacks do usuário'})
    async getUsersFeedback(@Req() req:any):Promise<GetUserFeedbackOutputDto[]> {
      return await this.getUsersFeedbackService.getUsersFeedback(req.user.userId);
    }

    @Post()
    @Roles(Role.ADMINISTRADOR, Role.MODERADOR)
    @ApiProperty({description: 'Adm posta feedback para os usuarios'})
    async postFeedback(@Body() dto: CreateFeedbackDto, @Req() req: any): Promise<number> {
      return this.postFeedbackService.postFeedback(dto, req);
      
    }

    
    @Post(':id/message')
    @Roles(Role.ADMINISTRADOR, Role.MODERADOR, Role.COMUM)
    @ApiProperty({description: 'Envio de mensagens dentro de um feedback'})
    @ApiParam({ name: 'id', description: 'ID do feedback', type: Number })
    async postMessageFeedback(@Param('id') feedbackId: number, @Body() body: any, @Req() req: any): Promise<PostMessageFeedbackOutputDto> {
      const { content } = body;
      return this.postMessageFeedbackService.postMessageFeedback(feedbackId, content, req)
      
    }




}
