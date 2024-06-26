import { Module } from '@nestjs/common';
import { LeadsService } from './leads/leads.service';
import { LeadsController } from './leads/leads.controller';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class AppModule {}
