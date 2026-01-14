import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { FindByEmailOutputDto } from "./dto/findByEmailOutput.dto";
import { CreateVoluntarioInputDto } from "./dto/createVoluntarioLogin.dto";
import { Role } from "./enum/role.enum";

@Injectable()
export class AuthRepository {

    constructor(private readonly db:DatabaseService) {}

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