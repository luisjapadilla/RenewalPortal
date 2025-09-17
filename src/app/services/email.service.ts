import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'https://contact-backend-ei48.onrender.com/api/email/send';

  constructor(private http: HttpClient) {}

  sendEmail(email: string, phone: string, apiKey: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, phone, apiKey });
  }
}
