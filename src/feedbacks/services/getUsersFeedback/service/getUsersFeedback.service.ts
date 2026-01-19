import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { GetUsersFeedbackRepository } from "../repositories/getUserFeedback.repository";
import { GetUserFeedbackOutputDto } from "../dto/getUserFeedbackOutput.dto";

@Injectable()
export class GetUsersFeedbackService {

    constructor(private readonly repository: GetUsersFeedbackRepository) {}


    async getUsersFeedback (userId: number): Promise<GetUserFeedbackOutputDto[]> {
        try {
            return await this.repository.getUserFeedbacks(userId);
        } catch {
            throw new InternalServerErrorException('Erro interno no servidor ao recuperar os feedbacks.')
        }
    }




}