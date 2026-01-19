import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";


@Injectable()
export class GetAllMessageFeedbackRepository {

    constructor(private readonly db: DatabaseService) {}

    async getAllMessageFeedback(feedbackId: number) {
        const sql = `
            SELECT 
                fm.id,
                fm.feedback_id,
                fm.author_id,
                fm.author_type,
                v.nome AS author_name,
                fm.content,
                fm.is_read,
                fm.created_at
            FROM feedback_messages fm
            JOIN voluntarios v ON v.id = fm.author_id
            JOIN feedbacks f ON f.id = fm.feedback_id
            WHERE fm.feedback_id = $1
            ORDER BY fm.created_at ASC
        `
        return await this.db.query(sql, [feedbackId]);
    }

}