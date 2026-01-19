import { Injectable } from "@nestjs/common";
import { GetFeedbackRepository } from "../repositories/getFeedbacks.repository";

@Injectable()
export class GetAllFeedbacksService {
  constructor(
    private readonly repository: GetFeedbackRepository,
  ) {}

  async getAllFeedbacks() {
    return await this.repository.getFeedbacks();
  }
}
