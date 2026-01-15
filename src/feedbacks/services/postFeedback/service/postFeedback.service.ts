import { Injectable } from "@nestjs/common";
import { PostFeedbackRepository } from "../repositories/postFeedback.repository";
import { CreateFeedbackDto } from "../dto/createFeedback.dto";
import { CreateFeedbackMessageDto } from "../dto/createMessage.dto";

@Injectable()
export class PostFeedbackService {

    constructor(private readonly feedbackRepository: PostFeedbackRepository) {}
 
    async postFeedback(dto: CreateFeedbackDto, req: any): Promise<number> {
        const result = await this.feedbackRepository.createFeedback(dto.userId, req.user.userId, dto.title);
        await this.feedbackRepository.createMessage(result.id,req.user.userId,req.user.role,dto.message);
        return result.id;
    }


    
}