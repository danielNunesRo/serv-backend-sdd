import { Module } from '@nestjs/common';
import { AuthServiceModule } from './service/auth.service.module';


@Module({
    imports: [AuthServiceModule],
    exports: [AuthServiceModule],
})
export class AuthModule {}
