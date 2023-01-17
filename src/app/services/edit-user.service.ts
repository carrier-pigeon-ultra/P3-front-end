import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  editUserURL:string = `${environment.baseUrl}/user`
 
  constructor(private httpCLient:HttpClient, private authService:AuthService) { }



  updateUserName(user:User):Observable<User> {
    return this.httpCLient.put<User>(this.editUserURL,user, { headers: this.authService.getAuthenticationHeaders() });
  }

  updateUserProfile(user:User):Observable<User> {
    return this.httpCLient.put<User>(`${this.editUserURL}/profile`, user, { headers: this.authService.getAuthenticationHeaders() });
  }

}
