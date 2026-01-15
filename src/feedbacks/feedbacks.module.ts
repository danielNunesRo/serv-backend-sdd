import { Module } from '@nestjs/common';
import { FeedbacksServicesModule } from './services/feedbacksService.module';

@Module({
    imports: [FeedbacksServicesModule],
    exports: [FeedbacksServicesModule]
})
export class FeedbacksModule {}
