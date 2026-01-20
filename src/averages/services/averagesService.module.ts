import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AverageController } from '../controller/averages.controller';
import { PostAverageService } from './postAverages/service/postAverages.service';
import { PostAverageRepository } from './postAverages/repositories/postAverage.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [AverageController],
    providers: [PostAverageService,
        PostAverageRepository
    ]
    
})
export class AveragesServiceModule {}
