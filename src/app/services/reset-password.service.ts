import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  resetUrl: string = `${environment.baseUrl}/reset-password`;
  resetFormUrl: string = `${environment.baseUrl}/reset-password-form`;

  constructor(private http: HttpClient) {}

  processForgotPasswordForm(email: string, token: string): void {
    const payload = { email: email, token: token };
    this.http.post(`${this.resetUrl}`, payload).subscribe();
  }

  // resetPassword(password: string): void {
  //   const payload = { password: password };
  //   this.http.post(`${this.resetFormUrl}`, payload).subscribe();
  // }
}
