import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { GetMessageFeedbackOutputDto } from "../dto/getMessageFeedbackOutput.dto";


@Injectable()
export class GetMessageFeedbackRepository {

    constructor(private readonly db: DatabaseService) {}

    async updateSQL(feedbackId: number, authorId: number):Promise<void> {
        const sql = `
            UPDATE feedback_messages
            SET is_read = true
            WHERE feedback_id = $1
            AND author_id <> $2
            AND is_read = false
        `
        const params = [feedbackId, authorId]
        const result = await this.db.query<GetMessageFeedbackOutputDto>(sql, params);
    }

    async markMessagesAsRead(
            feedbackId: number,
            viewerId: number
            ): Promise<void> {

            const sql = `
                UPDATE feedback_messages fm
                SET is_read = true
                FROM feedbacks f
                WHERE fm.feedback_id = f.id
                AND f.id = $1
                AND fm.author_id <> $2
            `;

        await this.db.query(sql, [feedbackId, viewerId]);
        }


    async getFeedbackMessages(feedbackId: number, viewerId: number): Promise<GetMessageFeedbackOutputDto[]> {
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
        AND (
            f.user_id = $2
            OR f.admin_id = $2
        )
        ORDER BY fm.created_at ASC
    `;

    const result = await this.db.query<GetMessageFeedbackOutputDto>(sql, [feedbackId, viewerId]);

    return result; 
    }

}