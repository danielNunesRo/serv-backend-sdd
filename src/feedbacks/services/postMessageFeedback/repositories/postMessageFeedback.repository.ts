import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { PostMessageFeedbackInputDto } from "../dto/postMessageFeedbackInput.dto";
import { PostMessageFeedbackOutputDto } from "../dto/postMessageFeedbackOutput.dto";

@Injectable()
export class PostMessageFeedbackRepository {

    constructor(private readonly db: DatabaseService) {}

    async postMessageFeedback (dto: PostMessageFeedbackInputDto): Promise<PostMessageFeedbackOutputDto> {
        const sql = `
            INSERT INTO feedback_messages (feedback_id, author_id, author_type, content)
            VALUES ($1, $2, $3, $4)
            RETURNING id, feedback_id, author_id, author_type, content, is_read, created_at 
        `;

        const params = [dto.feedbackId, dto.authorId, dto.authorType, dto.content];

        const result = await this.db.query<PostMessageFeedbackOutputDto>(sql, params);
        return result[0];
    }


}