import { Injectable } from "@nestjs/common";
import { GetMessageFeedbackRepository } from "../repository/getMessageFeedback.repository";
import { GetMessageFeedbackOutputDto } from "../dto/getMessageFeedbackOutput.dto";

@Injectable()
export class GetMessageFeedbackService {


    constructor(private readonly repository: GetMessageFeedbackRepository) {}

    async getMessageFeedbackService(feedbackId:number, req: any):Promise<GetMessageFeedbackOutputDto[]> {
        const userId = req.user.userId;
        await this.repository.markMessagesAsRead(feedbackId,userId,);
        
        return await this.repository.getFeedbackMessages(feedbackId,userId);
    }

}