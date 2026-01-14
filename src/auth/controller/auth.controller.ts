import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../service/auth.service";
import { LoginInputDto } from "../service/dto/loginInput.dto";
import { CreateVoluntarioInputDto } from "../service/dto/createVoluntarioLogin.dto";



@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {} 

    @Post('/create')
    @ApiOperation({ summary: 'Registrar um novo usuário' }) 
    @ApiCreatedResponse({ description: 'Usuário criado com sucesso' })
    @ApiInternalServerErrorResponse({ description: 'Erro ao criar usuário' })
    async createVoluntario(@Body() dto: CreateVoluntarioInputDto) {
        return this.authService.createVoluntario(dto);
    }

    @ApiOperation({ summary: 'Logar no sistema' }) 
    @Post('/login')
    @ApiCreatedResponse({description: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpFFCJ4.eyJzdWIiOjMsIm5vbFEcOiJQUklNRUlSTyBVB1VBUklPIE1BU1RFUiIsImVtYWlsIjoiQURNSU4iLCJyb2xlIjoiQURNSU5JU1ABEFPUiIsImlhdVI6MTc2ODM5NzQ5NiwiZXhwIjoxNzY4NDAxMDk2fQ.QeZUnKbif404-s_v4ElFiIkrjLrcZm3A6-vNxWvI1wo'})
    @ApiNotFoundResponse({description: 'Email não cadastrado.'})
    @ApiInternalServerErrorResponse({description: 'Erro interno no servidor'})
    @ApiBadRequestResponse({description: 'Senha incorreta.'})
    @ApiForbiddenResponse({description: 'Usuário desativado ou banido.'})
    async login(@Body() dto: LoginInputDto) {
        return this.authService.login(dto);
    }

}