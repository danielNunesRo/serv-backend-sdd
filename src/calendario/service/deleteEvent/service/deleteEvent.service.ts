import { Injectable, NotFoundException } from "@nestjs/common";
import { DeleteEventRepository } from "../repositories/deleteEvent.repository";

@Injectable()
export class DeleteEventService {

    constructor(private readonly repository: DeleteEventRepository) {}

    async deleteEvent(eventId: number): Promise<{ message: string }> {
        const deleted = await this.repository.deleteEventById(eventId);
        if (!deleted) {
            throw new NotFoundException('Evento não encontrado');
        }
        
        return {
            message: 'Evento deletado com sucesso.' + deleted.id,
        };
    
    
    }

}