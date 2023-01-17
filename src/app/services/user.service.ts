import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Post from '../models/Post';
import User from '../models/User';
import { UserResponse } from '../models/userresponse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private hostUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient, private authService:AuthService) {}

  getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(
      `${this.hostUrl}/auth/users/search/${userId}`,
      {
        headers: this.authService.getAuthenticationHeaders(),
        withCredentials: environment.withCredentials,
      }
    );
  }
  getUserPosts(userId: number, page: number, size: number): Observable<Post[]> {
    const reqParams = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get<Post[]>(
      `${this.hostUrl}/users/${userId}/posts`,
      { params: reqParams }, 
    );
  }
}
