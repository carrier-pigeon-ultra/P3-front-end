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
import { HttpHeaders } from '@angular/common/http';
import User from '../models/User';
import { LoginResponse } from '../models/dto/LoginResponse';
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit{
  authUrl: string = `${environment.baseUrl}/auth`;
  currentUser: User;
  private authUser: User;
  loginSubject = new Subject<User>();
  private authToken: string;
  //private jwtService = new JwtHelperService();


  principal: string;
  constructor(private http: HttpClient) {

    if(sessionStorage.getItem('authUser')!==null){
      this.currentUser = JSON.parse(sessionStorage.getItem('authUser') || '') as User;
    }

  }


  ngOnInit(): void {

    if(localStorage.getItem('authUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('authUser') || '')
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

    if (localStorage.getItem('token')) {
      localStorage.setItem('token','')
    }

    const res = this.http.post<any>(`${this.authUrl}/login`, payload, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
    res.subscribe({
      
      next: (data) => {

        let loginResponse:LoginResponse = data as LoginResponse;
        console.log(loginResponse)
        let token = loginResponse.token
        this.currentUser = loginResponse.user;
        if (token) localStorage.setItem('token', token);

        localStorage.setItem('authUser',JSON.stringify(this.currentUser));
        
      
    }});
    return res;
  }




  logout(): void {
    this.http.post(`${this.authUrl}/logout`, null).subscribe();
    localStorage.setItem('authUser', '');
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
      sessionStorage.setItem('authUser', JSON.stringify(authUser));
    }
    this.loginSubject.next(authUser);
  }
  getAuthUserFromCache(): User {
    return JSON.parse(localStorage.getItem('authUser') || '{}');
  }

  getAuthUserId(): number {
    return this.getAuthUserFromCache().id;
  }

  getAuthenticationHeaders():HttpHeaders {
    let token = localStorage.getItem('token');
    return token ? new HttpHeaders({authorization:token}) : new HttpHeaders();
  }

  getToken():string {
    return localStorage.getItem('token') || '';
  }



  getCurrentUser() : User {
    return JSON.parse(localStorage.getItem('authUser') || '') as User;
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
