import { Body, Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PostFeedbackService } from "../services/postFeedback/service/postFeedback.service";
import { CreateFeedbackDto } from "../services/postFeedback/dto/createFeedback.dto";
import { RolesGuard } from "src/auth/service/rolesguard/roles.guard.service";
import { CreateFeedbackMessageDto } from "../services/postFeedback/dto/createMessage.dto";
import { Roles } from "src/auth/service/decorator/roles.decorator";
import { Role } from "src/auth/service/enum/role.enum";
import { JwtAuthGuard } from "src/auth/service/jwt/jwt.auth.guard";

@ApiTags('feedbacks')
@Controller('feedbacks')
export class FeedbackController {

     constructor(private readonly postFeedbackService: PostFeedbackService) {}

    @Post()
    @UseGuards(JwtAuthGuard,RolesGuard) 
    @Roles(Role.ADMINISTRADOR, Role.MODERADOR)
    async postFeedback(@Body() dto: CreateFeedbackDto, @Req() req: any): Promise<number> {
      console.log(req.user.userId);
      return this.postFeedbackService.postFeedback(dto, req);
      
    }


  //   @Post()
  //   @UseGuards(RolesGuard) 
  //   @Roles(Role.ADMINISTRADOR, Role.MODERADOR)
  //   async createFeedback(@Body() dto: CreateFeedbackDto, @Req() req): Promise<number> {
  //       return this.postFeedbackService.createFeedback(dto, req);
  //   } 

  //   @Post(':id/messages') async createMessage(@Param('id') feedbackId: number, @Body() dto: CreateFeedbackMessageDto, @Req() req,
  // ): Promise<void> {
  //   return this.postFeedbackService.createMessage(feedbackId, dto, req.user);
  // }


}
