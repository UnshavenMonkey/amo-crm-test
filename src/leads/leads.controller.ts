import { Controller, Get } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller('leads')
export class LeadsController {
    constructor(private readonly leadsService: LeadsService) {}

    @Get()
    getLeads(): Observable<AxiosResponse<any>> {
        return this.leadsService.getLeads()
    }
}
