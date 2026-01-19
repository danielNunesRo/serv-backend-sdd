import { ApiProperty } from '@nestjs/swagger';

export class GetUserFeedbackOutputDto {
  @ApiProperty({ description: 'ID do feedback', example: 12 })
  id: number;

  @ApiProperty({ description: 'ID do usuário que recebeu o feedback', example: 5 })
  userId: number;

  @ApiProperty({ description: 'ID do admin/mod que criou o feedback', example: 1 })
  adminId: number;

  @ApiProperty({ description: 'Nome do admin/mod que criou o feedback', example: 'João Silva' })
  adminName: string;

  @ApiProperty({ description: 'Título do feedback', example: 'Desempenho no último debate' })
  title: string;

  @ApiProperty({ description: 'Status do feedback', example: 'OPEN' })
  status: string;

  @ApiProperty({ description: 'Data de criação do feedback', example: '2026-01-15T10:00:00Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de fechamento do feedback, se houver', example: '2026-01-16T15:30:00Z', required: false })
  closedAt?: Date;
}
