import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'ID do usuário que irá receber o feedback',
    example: 2,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Título do feedback',
    example: 'Desempenho no último debate',
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: 'Mensagem inicial do feedback',
    example: 'Precisamos melhorar a pontualidade nas reuniões.',
  })
  @IsString()
  @MinLength(1)
  message: string;
}
