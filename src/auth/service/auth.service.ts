import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "./auth.repository";
import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { LoginInputDto } from "./dto/loginInput.dto";
import * as bcrypt from 'bcrypt';
import { CreateVoluntarioInputDto } from "./dto/createVoluntarioLogin.dto";
import { Role } from "./enum/role.enum";
import { CreateOrgInputDto } from "./dto/createOrgInputDto";
import { UpdateRoleInputDto } from "./dto/updateRoleInput.dto";
import { AuditoriaRoleUpdateDto } from "./dto/auditoriaRoleUpdate.dto";
import { RequestWithUser } from "../types/requestWithUser.type";

@Injectable()
export class AuthService {

    constructor(private readonly repository: AuthRepository,
                private readonly jwtService: JwtService) {}

    
    async updateRoleVoluntario(dtoInput: UpdateRoleInputDto, req: any) {
        const existingUser = await this.repository.findByEmail(dtoInput.email);
        

        
        if(!existingUser) {
            throw new BadRequestException('Nenhum usuário com esse email');
        }


        const auditoriaDto: AuditoriaRoleUpdateDto = {
            contaEmail: dtoInput.email,
            roleAntiga: existingUser.role,
            roleAtualizada: dtoInput.role,
            atualizadaPorEmail: req.user.email,
        }

        try {
            const result=  await this.repository.updateRole(dtoInput);
            const auditada = await this.repository.auditoriaRoleUpdate(auditoriaDto);
            return {result, auditada};
            
        } catch {
            throw new InternalServerErrorException('Erro interno no servidor.');
        }
    }

    
    async createOrg(dtoInput: CreateOrgInputDto) {
        const existingUser = await this.repository.findByEmail(dtoInput.email.toUpperCase());
        
        if(existingUser) {
            throw new BadRequestException('Email de usuário já cadastrado no sistema');
        }

        const hashedPassword = await bcrypt.hash(dtoInput.senha, 10);
        const nomeUpper = dtoInput.nome.toUpperCase();
        const emailUpper = dtoInput.email.toUpperCase();

        const usuarioToSave = {
                ...dtoInput,
                nome: nomeUpper,
                email: emailUpper,
                senha: hashedPassword,
        };
        try {
            return await this.repository.createOrg(usuarioToSave);
        } catch {
            throw new InternalServerErrorException('Erro interno no Servidor');
        }
    }

    
    async createVoluntario (dtoInput: CreateVoluntarioInputDto) {
        const existingUser = await this.repository.findByEmail(dtoInput.email.toUpperCase());
        if(existingUser) {
                throw new BadRequestException('Email de usuário já cadastrado no sistema');
        }
        const hashedPassword = await bcrypt.hash(dtoInput.senha, 10);
        const nomeUpper = dtoInput.nome.toUpperCase();
        const emailUpper = dtoInput.email.toUpperCase();

        const usuarioToSave = {
                ...dtoInput,
                nome: nomeUpper,
                email: emailUpper,
                senha: hashedPassword,
        };

        try {
             return await this.repository.createVoluntario(usuarioToSave);
        } catch {
            throw new InternalServerErrorException('Erro no servidor');
        }

    }
    
                
    async login(dtoInput: LoginInputDto) {
        try {
            const user = await this.repository.findByEmail(dtoInput.email.toUpperCase());

            if(user.role == 'ADMINISTRADOR' && user.senha == dtoInput.senha) {
                const payload = {sub: user.id, nome: user.nome, email: user.email, role: user.role};
                return {
                acess_token: this.jwtService.sign(payload)
                };
            }

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