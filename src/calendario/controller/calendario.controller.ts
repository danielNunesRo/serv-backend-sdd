import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/service/decorator/roles.decorator";
import { Role } from "src/auth/service/enum/role.enum";
import { JwtAuthGuard } from "src/auth/service/jwt/jwt.auth.guard";
import { RolesGuard } from "src/auth/service/rolesguard/roles.guard.service";
import { PostEventOutputDto } from "../service/postEvent/dto/postEventOutput.dto";
import { PostEventService } from "../service/postEvent/service/postEvent.service";
import { PostEventInputDto } from "../service/postEvent/dto/postEventoInput.dto";
import { GetEventsService } from "../service/getEvents/service/getEvents.service";
import { GetEventOutputDto } from "../service/getEvents/dto/getEventsOutput.dto";


@ApiTags('calendario')
@UseGuards(JwtAuthGuard,RolesGuard) 
@Controller('calendario')
export class CalendarioController {

    constructor(private readonly postEventService: PostEventService,
        private readonly getEventsService: GetEventsService,
    ) {}
    

      @Get()
      @Roles(Role.ADMINISTRADOR, Role.MODERADOR, Role.COMUM)
      @ApiOkResponse({status: 200, type: GetEventOutputDto, isArray: true})
      @ApiInternalServerErrorResponse({status: 500, description: 'Erro interno no servidor ao tentar buscar os eventos'})
      async getEvent():Promise<GetEventOutputDto[]> {
          return await this.getEventsService.GetEvents();
      }
    
    
      @Post('evento')
      @Roles(Role.ADMINISTRADOR, Role.MODERADOR)
      @ApiProperty({description: 'Adm ou Mod pode criar um evento'})
      @ApiResponse({ status: 201, type: PostEventOutputDto})
      @ApiInternalServerErrorResponse({status: 500, description: 'Erro interno do servidor ao criar evento'})
      async postEvent(@Body() dto: PostEventInputDto, @Req() req: any): Promise<PostEventOutputDto> {
            const saveEvent = {
              createdBy: req.user.userId,
              title: dto.title,
              description: dto.description,
              dateEvent: dto.dateEvent
            }
            return await this.postEventService.createEvent(saveEvent.createdBy, saveEvent.title, saveEvent.description, saveEvent.dateEvent);
      }

}