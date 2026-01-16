import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class GetMessageFeedbackOutputDto {

  @ApiProperty({ description: 'ID da mensagem', example: 15 })
  id: number;
  
  @ApiProperty({ description: 'ID do Feedback', example: 12 })
  feedbackId: number;

  @ApiProperty({ description: 'ID do autor da mensagem', example: 3 })
  authorId: number;

  @ApiProperty({ description: 'Tipo/role do autor da mensagem', example: 'ADMIN' })
  authorType: string;

  @ApiProperty({ description: 'Nome do autor da mensagem', example: 'João Silva' })
  authorName: string;

  @ApiProperty({ description: 'Conteúdo da mensagem', example: 'Olá! Precisamos melhorar a pontualidade.' })
  content: string;

  @ApiProperty({ description: 'Se foi lido ou não', example: true })
  @IsBoolean()
  isRead: boolean;
  @ApiProperty({ description: 'Data de criação da mensagem', example: '2026-01-15T10:00:00Z' })
  createdAt: Date;

}