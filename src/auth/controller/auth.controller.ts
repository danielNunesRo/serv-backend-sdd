import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../service/auth.service";
import { LoginInputDto } from "../service/dto/loginInput.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {} 

    @ApiOperation({ summary: 'Logar no sistema' }) 
    @Post('/login')
    @ApiCreatedResponse({description: 'token'})
    @ApiNotFoundResponse({description: 'Email não cadastrado.'})
    @ApiInternalServerErrorResponse({description: 'Erro interno no servidor'})
    @ApiBadRequestResponse({description: 'Senha incorreta.'})
    @ApiForbiddenResponse({description: 'Usuário desativado ou banido.'})
    async login(@Body() dto: LoginInputDto) {
        return this.authService.login(dto);
    }

}