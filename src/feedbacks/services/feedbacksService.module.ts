import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PostFeedbackService } from './postFeedback/service/postFeedback.service';
import { PostFeedbackRepository } from './postFeedback/repositories/postFeedback.repository';
import { FeedbackController } from '../controller/feedback.controller';
import { GetUsersFeedbackService } from './getUsersFeedback/service/getUsersFeedback.service';
import { GetUsersFeedbackRepository } from './getUsersFeedback/repositories/getUserFeedback.repository';
import { GetMessageFeedbackService } from './getMessageFeedback/service/getMessageFeedback.service';
import { GetMessageFeedbackRepository } from './getMessageFeedback/repository/getMessageFeedback.repository';
import { PostMessageFeedbackService } from './postMessageFeedback/service/postMessageFeedback.service';
import { PostMessageFeedbackRepository } from './postMessageFeedback/repositories/postMessageFeedback.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [FeedbackController],
    providers: [PostFeedbackService,
        PostFeedbackRepository,
        PostMessageFeedbackService,
        PostMessageFeedbackRepository, 
        GetUsersFeedbackService, 
        GetUsersFeedbackRepository,
        GetMessageFeedbackService,
        GetMessageFeedbackRepository]
})
export class FeedbacksServicesModule {}
