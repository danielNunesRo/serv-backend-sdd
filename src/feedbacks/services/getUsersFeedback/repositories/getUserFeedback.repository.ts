import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { GetUserFeedbackOutputDto } from "../dto/getUserFeedbackOutput.dto";


@Injectable()
export class GetUsersFeedbackRepository {


    constructor(private readonly db: DatabaseService) {}

    async getUserFeedbacks(userId: number): Promise<GetUserFeedbackOutputDto[]> {
            const sql = `
                SELECT 
                    f.id,
                    f.user_id,
                    f.admin_id,
                    v.nome AS admin_name,
                    f.title,
                    f.status,
                    f.created_at,
                    f.closed_at
                FROM feedbacks f
                JOIN voluntarios v ON v.id = f.admin_id
                WHERE f.user_id = $1
                ORDER BY f.created_at DESC
            `;

            const params = [userId]
            
            const result = await this.db.query<GetUserFeedbackOutputDto>(sql,params);
            return result;
        }

    
}