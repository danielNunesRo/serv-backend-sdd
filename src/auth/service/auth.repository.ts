import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { FindByEmailOutputDto } from "./dto/findByEmailOutput.dto";

@Injectable()
export class AuthRepository {

    constructor(private readonly db:DatabaseService) {}

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