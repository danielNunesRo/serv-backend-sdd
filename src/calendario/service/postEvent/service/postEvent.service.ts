import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PostEventRepository } from "../repositories/postEvent.repository";
import { PostEventInputDto } from "../dto/postEventoInput.dto";
import { PostEventOutputDto } from "../dto/postEventOutput.dto";

@Injectable()
export class PostEventService {
 
    constructor(private readonly repository: PostEventRepository) {}

     async createEvent(createdBy: number, title: string,
            description: string,
            dateEvent: Date): Promise<PostEventOutputDto> {
        try {
            return await this.repository.postEvent(createdBy, title, description, dateEvent);
        } catch {
            throw new InternalServerErrorException('Erro interno do servidor ao criar evento');
        }


     }

}