import { Injectable } from "@nestjs/common";
import { PostMessageFeedbackRepository } from "../repositories/postMessageFeedback.repository";
import { PostMessageFeedbackInputDto } from "../dto/postMessageFeedbackInput.dto";
import { PostMessageFeedbackOutputDto } from "../dto/postMessageFeedbackOutput.dto";

@Injectable()
export class PostMessageFeedbackService {

    constructor(private readonly repository: PostMessageFeedbackRepository) {}

    async postMessageFeedback(feedbackId: number, content: string,req: any): Promise<PostMessageFeedbackOutputDto> {
        const dto: PostMessageFeedbackInputDto = {
             feedbackId: feedbackId,
             authorId: req.user.userId,
             authorType: req.user.role,
             content: content
        }
        
        return await this.repository.postMessageFeedback(dto);
        
        
    }


}