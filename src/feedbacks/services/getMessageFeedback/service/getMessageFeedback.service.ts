import { Injectable } from "@nestjs/common";
import { GetMessageFeedbackRepository } from "../repository/getMessageFeedback.repository";
import { GetMessageFeedbackOutputDto } from "../dto/getMessageFeedbackOutput.dto";

@Injectable()
export class GetMessageFeedbackService {


    constructor(private readonly repository: GetMessageFeedbackRepository) {}

    async getMessageFeedbackService(feedbackId:number):Promise<GetMessageFeedbackOutputDto> {
        return await this.repository.getFeedbackMessages(feedbackId);
    }

}