import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchResponse } from '../models/search-response';
import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = `${environment.baseUrl}/auth`;
  currentUser: User;

  constructor(private http: HttpClient) {}
  getUserSearchResult(
    searchText: string,
    currentPage: number,
    pageSize: number
  ): Observable<User[]> {
    const requestParams = new HttpParams()
      .set('searchText', searchText)
      .set('page', currentPage)
      .set('size', pageSize);
    return this.http.get<User[]>(`${this.authUrl}/users/search`, {
      params: requestParams,
    });
  }

  login(email: string, password: string): Observable<any> {
    const payload = { email: email, password: password };
    const res = this.http.post<any>(`${this.authUrl}/login`, payload, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
    res.subscribe((data) => {
      this.currentUser = data;
    });
    return res;
  }

  logout(): void {
    this.http.post(`${this.authUrl}/logout`, null).subscribe();
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<any> {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    return this.http.post<any>(`${this.authUrl}/register`, payload, {
      headers: environment.headers,
    });
  }
}
