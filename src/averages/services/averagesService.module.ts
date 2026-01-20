import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AverageController } from '../controller/averages.controller';
import { PostAverageService } from './postAverages/service/postAverages.service';
import { PostAverageRepository } from './postAverages/repositories/postAverage.repository';
import { GetMyAverageService } from './getMyAverage/service/getMyAverage.service';
import { GetMyAverageRepository } from './getMyAverage/repositories/getMyAverage.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [AverageController],
    providers: [PostAverageService,
        PostAverageRepository,
        GetMyAverageService,
        GetMyAverageRepository
    ]
    
})
export class AveragesServiceModule {}
