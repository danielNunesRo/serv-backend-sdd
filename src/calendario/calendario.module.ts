import { Module } from '@nestjs/common';
import { CalendarioServiceModule } from './service/calendarioService.module';

@Module({
    imports: [CalendarioServiceModule],
    exports: [CalendarioServiceModule]
})
export class CalendarioModule {}
