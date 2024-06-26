import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import {map, Observable} from 'rxjs';

@Injectable()
export class LeadsService {
    private readonly apiUrl = 'https://dudkovaleksandr.amocrm.ru/api/v4/leads';
    private readonly accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZjMDBhOTk0NGNlZGE0MjhhMTk5YjJkNjU5YjhiMWJmMjdmYTc2MWUxYjU3NGJlNTE3MDk2MzVmMDVkYWNmYTQzNWU0ZTI4ODVjMDVjMWZkIn0.eyJhdWQiOiI5ODljN2VjMC1kNWNjLTQ3YzctOTA1OS1mZjhlMDQwYTJkMTEiLCJqdGkiOiI2YzAwYTk5NDRjZWRhNDI4YTE5OWIyZDY1OWI4YjFiZjI3ZmE3NjFlMWI1NzRiZTUxNzA5NjM1ZjA1ZGFjZmE0MzVlNGUyODg1YzA1YzFmZCIsImlhdCI6MTcxOTQxOTQ3NCwibmJmIjoxNzE5NDE5NDc0LCJleHAiOjE3MzcwNzIwMDAsInN1YiI6IjExMjA2MDM0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxODIwNDM0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZjlmYTI4YTMtYTRiNy00YzE0LWE4YmYtOTMxNDk5ZGNjOTNiIn0.ft_hrxx8wm9qBMEVGPLpqQazC2KpKipv_-6yeiWTKHefx7u-N4goPNlluyokkE0eF6uTTQ6sFmYkyuHvIlgO6xvnKL2UQO9gTeh0HPFrkWpwZnJgmjyw1pTvMu9d7qfv4ALsPgSI5gCTCs--PWrJrQoBTCKju5orxQH-n-2ry2raq2usB3XraEpCM0xGaLp1--3DpV34raQQNvP-x8X7Wx1QNvyZum3_IdI3L_EjUvN-YOVBlEefBbYK6x-JWq0nNQS3w0m_HfvZJLuGp_mysNWOaJxA72A-6j6M2iRqLG5ylalG18hrs3jy7NY7AAyx8dcMwcbCoP4pQJKWjvm27g';

    constructor(private readonly httpService: HttpService) {}

    getLeads(): Observable<AxiosResponse<any>> {
        return this.httpService.get(this.apiUrl, {
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        }).pipe(
            map(response => response.data.leads) // Извлечение массива "leads" из объекта ответа
        );
    }
}

