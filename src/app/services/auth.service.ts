import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchResponse } from '../models/search-response';
import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = `${environment.baseUrl}/auth`;
  currentUser: User;
  private authUser: User;
  loginSubject = new Subject<User>();
  private authToken: string;
  //private jwtService = new JwtHelperService();


  principal: string;
  constructor(private http: HttpClient) {

    if(localStorage.getItem('authUser')!==null){
      this.currentUser = JSON.parse(localStorage.getItem('authUser') || '') as User;
    }

  }
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
      localStorage.setItem('authUser', JSON.stringify(this.currentUser));
    });
    return res;
  }

  logout(): void {
    this.http.post(`${this.authUrl}/logout`, null).subscribe();
    localStorage.clear;
  }
  register(firstName: string, lastName: string, email: string, password: string, birthday:Date, 
    hometown:string, currentResidence:string, biography:string): Observable<any> {
    const payload = {
      firstName: firstName,
       lastName: lastName, 
       email: email, 
       password: password,
       birthday: birthday,
       hometown: hometown,
       currentResidence: currentResidence,
       biography: biography
      };
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }
  storeAuthUserInCache(authUser: User): void {
    if (authUser != null) {
      this.authUser = authUser;
      localStorage.setItem('authUser', JSON.stringify(authUser));
    }
    this.loginSubject.next(authUser);
  }
  getAuthUserFromCache(): User {
    return JSON.parse(localStorage.getItem('authUser') || '{}');
  }

  getAuthUserId(): number {
    return this.getAuthUserFromCache().id;
  }
  /*
  isUserLoggedIn(): boolean {
    this.loadAuthTokenFromCache();

    if (this.authToken != null && this.authToken != '') {
      if (this.jwtService.decodeToken(this.authToken).sub != null || '') {
        if (!this.jwtService.isTokenExpired(this.authToken)) {
          this.principal = this.jwtService.decodeToken(this.authToken).sub;
          return true;
        }
      }
    }

    this.logout();
    return false;
  }
  loadAuthTokenFromCache() {
    throw new Error('Method not implemented.');
    //this.authToken = localStorage.getItem('authToken');
  }*/

 

}
