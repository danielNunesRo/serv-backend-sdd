import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "./auth.repository";
import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { LoginInputDto } from "./dto/loginInput.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly repository: AuthRepository,
                private readonly jwtService: JwtService) {}
    
                
    async login(dtoInput: LoginInputDto) {
        try {
            const user = await this.repository.findByEmail(dtoInput.email.toUpperCase());

            if (!user) {
                throw new NotFoundException('Email não cadastrado.');
            }

            if (!user.ativo) {
                throw new ForbiddenException('Usuário desativado ou banido.');
            }

            const isPasswordValid = await bcrypt.compare(dtoInput.senha, user.senha);
            
            if(!isPasswordValid) {
                throw new BadRequestException('Senha incorreta'); 
            }

            const payload = {sub: user.id, nome: user.nome, email: user.email, role: user.role};

            return {
                acess_token: this.jwtService.sign(payload)
            };

        } catch {
             throw new InternalServerErrorException('Erro interno no servidor');
        }

    }


}