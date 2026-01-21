import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { GetMyAverageOutputDto } from "../dto/getMyAverageOutput.dto";


@Injectable()
export class GetMyAverageRepository {

    constructor(private readonly db: DatabaseService) {}

    async getMyAverage(id: number): Promise<GetMyAverageOutputDto[]> {
        const sql = 
        `
            SELECT 
                mv.id,
                v.nome AS voluntario,
                mv.media,
                mv.data_media,
                mv.created_by,
                admin.nome AS admin
            FROM medias_voluntarios mv
            INNER JOIN voluntarios v 
                ON v.id = mv.voluntario_id
            INNER JOIN voluntarios admin
                ON admin.id = mv.created_by
            WHERE voluntario_id = $1
            ORDER BY data_media desc
            limit 5
        `

        const result = this.db.query<GetMyAverageOutputDto>(sql, [id]);
        return result;
    }

}