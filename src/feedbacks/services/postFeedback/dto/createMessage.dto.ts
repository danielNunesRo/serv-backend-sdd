import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateFeedbackMessageDto {
  @ApiProperty({
    description: 'Conteúdo da mensagem do feedback',
    example: 'Entendi o feedback e vou melhorar.',
  })
  @IsString()
  @MinLength(1)
  message: string;
}
