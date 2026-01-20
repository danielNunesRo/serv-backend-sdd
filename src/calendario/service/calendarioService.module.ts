import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PostEventService } from './postEvent/service/postEvent.service';
import { PostEventRepository } from './postEvent/repositories/postEvent.repository';
import { CalendarioController } from '../controller/calendario.controller';
import { GetEventsService } from './getEvents/service/getEvents.service';
import { GetEventsRepository } from './getEvents/repositories/getEvents.repository';
import { DeleteEventService } from './deleteEvent/service/deleteEvent.service';
import { DeleteEventRepository } from './deleteEvent/repositories/deleteEvent.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [CalendarioController],
    providers: [PostEventService, 
        PostEventRepository,
        GetEventsService,
        GetEventsRepository,
        DeleteEventService,
        DeleteEventRepository]
})
export class CalendarioServiceModule {}
