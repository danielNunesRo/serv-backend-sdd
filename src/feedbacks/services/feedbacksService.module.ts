import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PostFeedbackService } from './postFeedback/service/postFeedback.service';
import { PostFeedbackRepository } from './postFeedback/repositories/postFeedback.repository';
import { FeedbackController } from '../controller/feedback.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [FeedbackController],
    providers: [PostFeedbackService,PostFeedbackRepository]
})
export class FeedbacksServicesModule {}
