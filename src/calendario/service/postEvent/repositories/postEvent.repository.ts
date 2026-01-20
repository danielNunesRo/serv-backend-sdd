import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { PostEventOutputDto } from "../dto/postEventOutput.dto";
import { PostEventInputDto } from "../dto/postEventoInput.dto";

@Injectable()
export class PostEventRepository{

    constructor (private readonly db: DatabaseService) {}

    async postEvent(createdBy: number, title: string,
            description: string,
            dateEvent: Date):Promise<PostEventOutputDto> {
        const sql = `
            INSERT INTO events(created_by, title, description, date_event)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `

        const params = [createdBy, title, description, dateEvent];
        const result = await this.db.query<PostEventOutputDto>(sql, params);
        return result[0];
    }

}
