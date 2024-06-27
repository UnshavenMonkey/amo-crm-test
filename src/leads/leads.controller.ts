import {Controller, Get, Query} from '@nestjs/common';
import { LeadsService } from './leads.service';
import {Observable, tap} from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller('leads')
export class LeadsController {
    constructor(private readonly leadsService: LeadsService) {}

    @Get()
    getLeads(@Query('query') query?: string | number): Observable<AxiosResponse<any>> {
        return this.leadsService.getLeads(query)
    }
}
