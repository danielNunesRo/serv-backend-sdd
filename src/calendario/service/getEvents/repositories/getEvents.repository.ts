import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { GetEventOutputDto } from "../dto/getEventsOutput.dto";

@Injectable()
export class GetEventsRepository {
  
    constructor(private readonly db: DatabaseService) {}

    async getEvents():Promise<GetEventOutputDto[]> {
    const sql = `
        SELECT
            e.id,
            v.nome AS "createdBy",
            e.title,
            e.description,
            e.date_event AS "dateEvent",
            e.created_at AS "createdAt"
      FROM events e
      INNER JOIN voluntarios v
        ON v.id = e.created_by
      ORDER BY e.date_event ASC
    `;

    const result= await this.db.query<GetEventOutputDto>(sql);
    return result;
  }

} 