import { Injectable } from "@nestjs/common";
import { GetMyAverageRepository } from "../repositories/getMyAverage.repository";
import { GetMyAverageOutputDto } from "../dto/getMyAverageOutput.dto";

@Injectable()
export class GetMyAverageService {

    constructor(private readonly repository: GetMyAverageRepository) {}

    async getMyAverage(req: any): Promise<GetMyAverageOutputDto[]> {
        return await this.repository.getMyAverage(req.user.userId);
    }


}