import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  constructor(private http: HttpClient) {}

  verify(userId: string, apiKey: string): Observable<any> {
    return this.http.post('/api/verify', { userId, apiKey });
  }
}
