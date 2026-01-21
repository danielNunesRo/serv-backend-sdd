import { Module } from '@nestjs/common';
import { AveragesServiceModule } from './services/averagesService.module';

@Module({
    imports: [AveragesServiceModule],
    exports: [AveragesServiceModule]
})
export class AveragesModule {}
