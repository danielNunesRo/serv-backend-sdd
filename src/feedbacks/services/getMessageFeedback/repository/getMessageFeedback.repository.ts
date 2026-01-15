import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { GetMessageFeedbackOutputDto } from "../dto/getMessageFeedbackOutput.dto";


@Injectable()
export class GetMessageFeedbackRepository {

    constructor(private readonly db: DatabaseService) {}


    async getFeedbackMessages(feedbackId: number): Promise<GetMessageFeedbackOutputDto> {
    const sql = `
        SELECT 
            fm.id,
            fm.author_id,
            fm.author_type,
            v.nome AS author_name,
            fm.content,
            fm.created_at
        FROM feedback_messages fm
        JOIN voluntarios v ON v.id = fm.author_id
        WHERE fm.feedback_id = $1
        ORDER BY fm.created_at ASC
    `;

    const result = await this.db.query<GetMessageFeedbackOutputDto>(sql, [feedbackId]);

    return result[0]; 
    }

}