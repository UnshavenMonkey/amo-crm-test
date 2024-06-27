import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import {catchError, forkJoin, map, mergeMap, Observable, of} from 'rxjs';
import {response} from "express";

interface Lead {
    id: number;
    name: string;
    price: number;
    responsible_user_id: number;
    group_id: number;
    status_id: number;
    pipeline_id: number;
    loss_reason_id: number;
    source_id: number;
    created_by: number;
    updated_by: number;
    closed_at: number;
    created_at: number;
    updated_at: number;
    closest_task_at: number;
    is_deleted: boolean;
    custom_fields_values: Array<string> | null;
    score: number | null;
    account_id: number;
    labor_cost: number;
    _embedded: { contacts: { id: number } };
}

@Injectable()
export class LeadsService {
    private readonly apiUrl = 'https://dudkovaleksandr.amocrm.ru/api/v4/';
    private readonly accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZjMDBhOTk0NGNlZGE0MjhhMTk5YjJkNjU5YjhiMWJmMjdmYTc2MWUxYjU3NGJlNTE3MDk2MzVmMDVkYWNmYTQzNWU0ZTI4ODVjMDVjMWZkIn0.eyJhdWQiOiI5ODljN2VjMC1kNWNjLTQ3YzctOTA1OS1mZjhlMDQwYTJkMTEiLCJqdGkiOiI2YzAwYTk5NDRjZWRhNDI4YTE5OWIyZDY1OWI4YjFiZjI3ZmE3NjFlMWI1NzRiZTUxNzA5NjM1ZjA1ZGFjZmE0MzVlNGUyODg1YzA1YzFmZCIsImlhdCI6MTcxOTQxOTQ3NCwibmJmIjoxNzE5NDE5NDc0LCJleHAiOjE3MzcwNzIwMDAsInN1YiI6IjExMjA2MDM0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxODIwNDM0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZjlmYTI4YTMtYTRiNy00YzE0LWE4YmYtOTMxNDk5ZGNjOTNiIn0.ft_hrxx8wm9qBMEVGPLpqQazC2KpKipv_-6yeiWTKHefx7u-N4goPNlluyokkE0eF6uTTQ6sFmYkyuHvIlgO6xvnKL2UQO9gTeh0HPFrkWpwZnJgmjyw1pTvMu9d7qfv4ALsPgSI5gCTCs--PWrJrQoBTCKju5orxQH-n-2ry2raq2usB3XraEpCM0xGaLp1--3DpV34raQQNvP-x8X7Wx1QNvyZum3_IdI3L_EjUvN-YOVBlEefBbYK6x-JWq0nNQS3w0m_HfvZJLuGp_mysNWOaJxA72A-6j6M2iRqLG5ylalG18hrs3jy7NY7AAyx8dcMwcbCoP4pQJKWjvm27g';

    constructor(private readonly httpService: HttpService) {}

    getLeads(): Observable<any> {
        return this.httpService.get(`${this.apiUrl}leads?with=contacts`, {
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        }).pipe(
            mergeMap(response => {
                const leads = response.data._embedded.leads;
                const leadWithDetails = leads.map((lead: Lead) =>
                    forkJoin({
                        user: this.httpService.get(`${this.apiUrl}users/${lead.responsible_user_id}`, {
                            headers: {
                                Authorization: `Bearer ${this.accessToken}`,
                            },
                        }).pipe(
                            map(userResponse => userResponse.data)
                        ),
                        status: this.httpService.get(`${this.apiUrl}leads/pipelines/${lead.pipeline_id}/statuses/${lead.status_id}`, {
                            headers: {
                                Authorization: `Bearer ${this.accessToken}`,
                            },
                        }).pipe(
                            map(statusResponse => statusResponse.data),
                        ),
                        contacts: this.httpService.get(`${this.apiUrl}contacts/${lead._embedded.contacts[0].id}`, {
                            headers: {
                                Authorization: `Bearer ${this.accessToken}`,
                            },
                        }).pipe(
                            map(statusResponse => statusResponse.data),
                        )
                    }).pipe(
                        map(details => ({ ...lead, user: details.user, status: details.status, contacts: details.contacts }))
                    ));
                return forkJoin(leadWithDetails);
            })
        );
    }
}
