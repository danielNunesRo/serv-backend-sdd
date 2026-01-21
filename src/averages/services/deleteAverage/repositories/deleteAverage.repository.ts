import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class DeleteAverageRepository {

    constructor(private readonly db: DatabaseService) {}

    async DeleteAverageRepository(id: number) {
        const sql = `
             DELETE FROM medias_voluntarios
                WHERE id = $1
                RETURNING id
        `

        const result = await this.db.query(sql, [id]);
        return result;
    }

}