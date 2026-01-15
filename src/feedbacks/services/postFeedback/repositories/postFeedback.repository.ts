import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateFeedbackDto } from "../dto/createFeedback.dto";
import { Role } from "src/auth/service/enum/role.enum";
import { createFeedbackOutputDto } from "../dto/createFeedbackOutput.dto";

@Injectable()
export class PostFeedbackRepository {

    constructor(private readonly db: DatabaseService) {}

    async createFeedback(userId: number, adminId: number, title: string):Promise<createFeedbackOutputDto> {
        const sql = `
            INSERT INTO feedbacks (user_id, admin_id, title)
            VALUES ($1, $2, $3)
            RETURNING id
        `;

        const params = [userId, adminId, title];
        const result = await this.db.query<createFeedbackOutputDto>(sql, params);
        return result[0];
    }

    async createMessage(feedbackId: number,
                    authorId: number,
                    authorType: Role,
                    message: string,): Promise<void> {
            const sql = `INSERT INTO feedback_messages (
                feedback_id,
                author_id,
                author_type,
                content
                )
                VALUES ($1, $2, $3, $4) 
            `
        const params = [feedbackId, authorId, authorType, message];
        await this.db.query(sql, params);
    }


}