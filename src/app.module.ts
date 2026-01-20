import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { CalendarioModule } from './calendario/calendario.module';


@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true, 
    }),
    DatabaseModule,
    AuthModule,
    FeedbacksModule,
    CalendarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
