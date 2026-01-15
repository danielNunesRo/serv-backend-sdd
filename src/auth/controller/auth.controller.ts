import { Body, Controller, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../service/auth.service";
import { LoginInputDto } from "../service/dto/loginInput.dto";
import { CreateVoluntarioInputDto } from "../service/dto/createVoluntarioLogin.dto";
import { CreateOrgInputDto } from "../service/dto/createOrgInputDto";
import { RolesGuard } from "../service/rolesguard/roles.guard.service";
import { Role } from "../service/enum/role.enum";
import { Roles } from "../service/decorator/roles.decorator";
import { JwtAuthGuard } from "../service/jwt/jwt.auth.guard";
import { UpdateRoleInputDto } from "../service/dto/updateRoleInput.dto";
import { RequestWithUser } from "../types/requestWithUser.type";



@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {} 

    @Post('/create')
    @ApiOperation({ summary: 'Registrar um novo usuário' }) 
    @ApiCreatedResponse({ description: 'Usuário criado com sucesso' })
    @ApiInternalServerErrorResponse({ description: 'Erro ao criar usuário' })
    async createVoluntario(@Body() dto: CreateVoluntarioInputDto) {
        return await this.authService.createVoluntario(dto);
    }

    @ApiOperation({ summary: 'Logar no sistema' }) 
    @Post('/login')
    @ApiCreatedResponse({description: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpFFCJ4.eyJzdWIiOjMsIm5vbFEcOiJQUklNRUlSTyBVB1VBUklPIE1BU1RFUiIsImVtYWlsIjoiQURNSU4iLCJyb2xlIjoiQURNSU5JU1ABEFPUiIsImlhdVI6MTc2ODM5NzQ5NiwiZXhwIjoxNzY4NDAxMDk2fQ.QeZUnKbif404-s_v4ElFiIkrjLrcZm3A6-vNxWvI1wo'})
    @ApiNotFoundResponse({description: 'Email não cadastrado.'})
    @ApiInternalServerErrorResponse({description: 'Erro interno no servidor'})
    @ApiBadRequestResponse({description: 'Senha incorreta.'})
    @ApiForbiddenResponse({description: 'Usuário desativado ou banido.'})
    async login(@Body() dto: LoginInputDto) {
        return await this.authService.login(dto);
    }

    @ApiOperation({ summary: 'Criar um novo usuario moderador ou administrador' }) 
    @ApiCreatedResponse({ description: 'Usuário criado com sucesso' })
    @ApiInternalServerErrorResponse({ description: 'Erro ao criar usuário' })
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.ADMINISTRADOR)
    @Post('/create-org')
    async createOrg(@Body() dto: CreateOrgInputDto) {
        return await this.authService.createOrg(dto);
    }

    @Put('/update-role')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMINISTRADOR)
    async updateRole(@Body() dto: UpdateRoleInputDto, @Req() req: any) {
        return await this.authService.updateRoleVoluntario(dto, req);
    }


}