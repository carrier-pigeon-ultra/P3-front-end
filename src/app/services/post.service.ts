import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Post from '../models/Post';
import User from '../models/User'

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postUrl: string = `${environment.baseUrl}/post`;

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}`, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  getAllTopPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}/feed`, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  upsertPost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.postUrl}`, post, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  getUserPosts(user:User):Observable<Post[]> {
    return this.http.get<Post[]>( `${this.postUrl}/${user.id}`, { 
      headers: environment.headers, 
      withCredentials: environment.withCredentials,
    });
  }

  deleteUserPost(user:User, post:Post): Observable<Post> {
    return this.http.delete<Post>(`${this.postUrl}/${post.id}`, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

}
