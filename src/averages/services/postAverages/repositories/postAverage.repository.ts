import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { PostAverageInputDto } from "../dto/postAverageInput.dto";
import { PostAverageOutputDto } from "../dto/postAverageOutput.dto";

@Injectable()
export class PostAverageRepository {

    constructor(private readonly db: DatabaseService) {}

    async postAverage(dto: PostAverageInputDto, req:any): Promise<PostAverageOutputDto> {
        const sql = `
        INSERT INTO medias_voluntarios (voluntario_id, media, data_media, created_by)
        VALUES ($1, $2, $3, $4)
        RETURNING id, voluntario_id, media, data_media, created_by, data_criacao;
        `

        const params = [dto.voluntarioId, dto.media, dto.dataMedia, req.user.userId]

        const result = await this.db.query<PostAverageOutputDto>(sql, params);
        return result[0];
    }

}