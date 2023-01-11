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

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private hostUrl = environment.baseUrl;
  //private jwtService = new JwtHelperService();
  constructor(private httpClient: HttpClient) {}

  getUserById(userId: number): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(
      `${this.hostUrl}/users/search/${userId}`
    );
  }
  getUserPosts(userId: number, page: number, size: number): Observable<Post[]> {
    const reqParams = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get<Post[]>(
      `${this.hostUrl}/users/${userId}/posts`,
      { params: reqParams }
    );
  }
}
