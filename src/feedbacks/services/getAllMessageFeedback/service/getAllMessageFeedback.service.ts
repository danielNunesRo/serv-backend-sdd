import { Injectable } from "@nestjs/common";
import { GetAllMessageFeedbackRepository } from "../repositories/getAllMessageFeedback.repository";

@Injectable()
export class GetAllMessagesFeedbackService {


    constructor(private readonly repository: GetAllMessageFeedbackRepository) {}

    async getAllMessageFeedback (feedbackId: number) {
        return await this.repository.getAllMessageFeedback(feedbackId);
    }

}
