import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service"



@Injectable()
export class DeleteEventRepository {

    constructor(private readonly db: DatabaseService) {}
    
    async deleteEventById(eventId: number): Promise<{ id: number }> {

        const sql = `
            DELETE FROM events
            WHERE id = $1
            RETURNING id
            `;
        
        
        const result = await this.db.query<{ id: number }>(sql, [eventId]);
        return result[0];
    }
        


    }

