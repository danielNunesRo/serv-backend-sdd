import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { FindByEmailOutputDto } from "./dto/findByEmailOutput.dto";
import { CreateVoluntarioInputDto } from "./dto/createVoluntarioLogin.dto";
import { Role } from "./enum/role.enum";
import { CreateOrgInputDto } from "./dto/createOrgInputDto";
import { UpdateRoleInputDto } from "./dto/updateRoleInput.dto";
import { AuditoriaRoleUpdateDto } from "./dto/auditoriaRoleUpdate.dto";

@Injectable()
export class AuthRepository {

    constructor(private readonly db:DatabaseService) {}

    async auditoriaRoleUpdate(dtoInput: AuditoriaRoleUpdateDto) {
        const sql = `
            INSERT INTO voluntarios_auditoria (conta_email, role_antiga, role_atualizada, atualizada_por_email)
            VALUES ($1,$2,$3,$4)
            RETURNING conta_email, role_antiga, role_atualizada, atualizada_por_email, data_atualizacao    
        `
        const params = [dtoInput.contaEmail, dtoInput.roleAntiga, dtoInput.roleAtualizada, dtoInput.atualizadaPorEmail];
        const result = await this.db.query<{conta_email: string; role_antiga: Role; role_atualizada: Role; atualizada_por_email: string; data_atualizacao: Date}>(sql, params);
        return result[0];
    }

    async updateRole(dtoInput: UpdateRoleInputDto) {
        const sql = `
            UPDATE voluntarios
            SET role = $1
            WHERE email = $2
            RETURNING nome, email, role;
        `

        const params = [dtoInput.role, dtoInput.email];
        const result = await this.db.query<{nome: string; email: string; role: Role}>(sql, params);
        return result[0];
    }

    async createOrg(dtoCreate: CreateOrgInputDto) {
        const sql = `
            INSERT INTO voluntarios (nome, email, senha, role)
            VALUES ($1, $2, $3, $4)
            RETURNING nome, email, senha, role
        `

        const params = [dtoCreate.nome, dtoCreate.email, dtoCreate.senha, dtoCreate.role];
        const result = await this.db.query<{nome: string; email: string; role: string }>(sql, params);
        return result[0];
    }

    async createVoluntario (dtoCreate: CreateVoluntarioInputDto) {
        const sql = `
            INSERT INTO voluntarios (nome, email, senha)
            VALUES ($1, $2, $3)
            RETURNING nome, email, senha
    `;

        const params = [dtoCreate.nome, dtoCreate.email, dtoCreate.senha];

        const result = await this.db.query<{nome: string; email: string; role: string }>(sql, params);
        return result[0];
    }

    async findByEmail(email: string): Promise<FindByEmailOutputDto> {
        const sql = `
            SELECT id, nome, email, role, senha, ativo
            FROM voluntarios
            WHERE email = $1
        `;

        const params = [email];
        
        const result = await this.db.query<FindByEmailOutputDto>(sql, params);
        return result[0];
    }

}