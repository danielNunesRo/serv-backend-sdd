import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PostFeedbackService } from './postFeedback/service/postFeedback.service';
import { PostFeedbackRepository } from './postFeedback/repositories/postFeedback.repository';
import { FeedbackController } from '../controller/feedback.controller';
import { GetUsersFeedbackService } from './getUsersFeedback/service/getUsersFeedback.service';
import { GetUsersFeedbackRepository } from './getUsersFeedback/repositories/getUserFeedback.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [FeedbackController],
    providers: [PostFeedbackService,
        PostFeedbackRepository, 
        GetUsersFeedbackService, 
        GetUsersFeedbackRepository]
})
export class FeedbacksServicesModule {}
