import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    exports: [],
    providers: [],
    controllers: []
})
export class AuthServiceModule {}
