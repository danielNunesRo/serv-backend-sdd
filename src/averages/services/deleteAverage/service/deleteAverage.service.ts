import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteAverageRepository } from '../repositories/deleteAverage.repository';


@Injectable()
export class DeleteAverageService {
  constructor(
    private readonly averageRepository: DeleteAverageRepository,
  ) {}

  async deleteAverage(id: number): Promise<boolean> {
    const result = await this.averageRepository.DeleteAverageRepository(id);

    if (!result || result.length === 0) {
      throw new NotFoundException('Média não encontrada');
    }

    return true;
  }
}
