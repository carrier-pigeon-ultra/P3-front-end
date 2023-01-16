import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  editUserURL:string = `${environment.baseUrl}/user`
  headers = { headers: environment.headers, withCredentials: environment.withCredentials}

  constructor(private httpCLient:HttpClient) { }



  updateUserName(user:User):Observable<User> {
    return this.httpCLient.put<User>(this.editUserURL, user, this.headers);
  }

  updateUserProfile(user:User):Observable<User> {
    return this.httpCLient.put<User>(`${this.editUserURL}/profile`, user, this.headers );
  }

}
