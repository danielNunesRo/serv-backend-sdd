import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { GetEventsRepository } from "../repositories/getEvents.repository";
import { GetEventOutputDto } from "../dto/getEventsOutput.dto";

@Injectable()
export class GetEventsService {

    constructor(private readonly repository: GetEventsRepository) {}


    async GetEvents () : Promise<GetEventOutputDto[]>{
        try {
            return await this.repository.getEvents();
        } catch {
            throw new InternalServerErrorException('Erro interno no servidor ao tentar buscar os eventos');
        }
    }

}