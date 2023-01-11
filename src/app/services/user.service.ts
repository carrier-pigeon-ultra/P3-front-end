import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private hostUrl = environment.baseUrl;
  //private jwtService = new JwtHelperService();
  constructor(private httpClient: HttpClient) {}

  getUserById(userId: number): Observable<User | HttpErrorResponse> {
    return this.httpClient.get<User | HttpErrorResponse>(
      `${this.hostUrl}/users/search/${userId}`
    );
  }
}
