import { Injectable } from "@nestjs/common";
import { PostAverageRepository } from "../repositories/postAverage.repository";
import { PostAverageInputDto } from "../dto/postAverageInput.dto";
import { PostAverageOutputDto } from "../dto/postAverageOutput.dto";

@Injectable()
export class PostAverageService {

    constructor(private readonly repository: PostAverageRepository) {}

    async postAverage(dto: PostAverageInputDto, req: any): Promise<PostAverageOutputDto> {
        return await this.repository.postAverage(dto, req);
    }

}