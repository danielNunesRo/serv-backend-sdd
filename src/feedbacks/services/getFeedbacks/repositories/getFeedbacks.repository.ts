import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";


@Injectable()
export class GetFeedbackRepository {

    constructor(private readonly db: DatabaseService) {}

    async getFeedbacks() {
        const sql = `
            SELECT 
                f.id,
                f.user_id,
                f.admin_id,
                v.nome AS admin_name,
                vu.nome AS user_name,
                f.title,
                f.status,
                f.created_at
            FROM feedbacks f
            JOIN voluntarios v ON v.id = f.admin_id
            JOIN voluntarios vu ON vu.id = f.user_id
            ORDER BY f.created_at DESC
        `
        return await this.db.query(sql,[]);
    }

}