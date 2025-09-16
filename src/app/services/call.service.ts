import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  private apiUrl = 'https://demo-collections-portal-api-staging-425606489374.us-central1.run.app/schedule/';

  constructor(private http: HttpClient) {}

  scheduleCall(phone: string, apiKey: string): Observable<any> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json'
    });

    const body = {
      Bot: 'GENERIC_RENEWALS',
      'Client Name': 'Generic Renewal Contact',
      'Phone Number': phone,
      Delay: 0,
      currency: 'USD'
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
