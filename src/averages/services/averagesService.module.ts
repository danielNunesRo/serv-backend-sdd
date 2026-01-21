import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AverageController } from '../controller/averages.controller';
import { PostAverageService } from './postAverages/service/postAverages.service';
import { PostAverageRepository } from './postAverages/repositories/postAverage.repository';
import { GetMyAverageService } from './getMyAverage/service/getMyAverage.service';
import { GetMyAverageRepository } from './getMyAverage/repositories/getMyAverage.repository';
import { DeleteAverageService } from './deleteAverage/service/deleteAverage.service';
import { DeleteAverageRepository } from './deleteAverage/repositories/deleteAverage.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [AverageController],
    providers: [PostAverageService,
        PostAverageRepository,
        GetMyAverageService,
        GetMyAverageRepository,
        DeleteAverageService,
        DeleteAverageRepository
    ]
    
})
export class AveragesServiceModule {}
