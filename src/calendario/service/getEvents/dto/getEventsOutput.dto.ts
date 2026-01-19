import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsString, IsOptional } from 'class-validator';

export class GetEventOutputDto {
  @ApiProperty({
    description: 'ID do evento',
    example: 1,
  })
  @IsInt()
  id!: number;

  @ApiProperty({
    description: 'Nome do voluntário (adm/mod) que criou o evento',
    example: 'João Silva',
  })
  @IsString()
  createdBy!: string;

  @ApiProperty({
    description: 'Título do evento',
    example: 'Debate UFSC',
  })
  @IsString()
  title!: string;

  @ApiProperty({
    description: 'Descrição do evento',
    example: 'Evento ocorrerá de forma online',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Data do evento',
    example: '2026-02-10',
    type: String,
  })
  @IsDate()
  dateEvent!: Date;

  @ApiProperty({
    description: 'Data de criação do evento',
    example: '2026-01-18T12:00:00.000Z',
  })
  @IsDate()
  createdAt!: Date;
}
