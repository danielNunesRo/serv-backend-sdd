import { ApiProperty } from '@nestjs/swagger';

export class PostAverageOutputDto {

  @ApiProperty({
    description: 'ID da média criada',
    example: 42,
  })
  id: number;

  @ApiProperty({
    description: 'ID do voluntário que recebeu a média',
    example: 6,
  })
  voluntarioId: number;

  @ApiProperty({
    description: 'Valor da média registrada',
    example: 8.75,
  })
  media: number;

  @ApiProperty({
    description: 'Data de referência da média',
    example: '2026-01-15',
  })
  dataMedia: string;

  @ApiProperty({
    description: 'ID do usuário (ADM) que registrou a média',
    example: 3,
  })
  createdBy: number;

  @ApiProperty({
    description: 'Data/hora de criação do registro',
    example: '2026-01-15T10:32:48.123Z',
  })
  dataCriacao: Date;
}
