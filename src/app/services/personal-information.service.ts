import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import PersonalInformation from '../models/PersonalInformation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {

  informationUrl:string = environment.baseUrl + `/personal-information`;

  constructor(private http:HttpClient) { }

  getPersonalInformation(): Observable<PersonalInformation> {
    return this.http.get<PersonalInformation>( this.informationUrl, { 
      headers: environment.headers, 
      withCredentials: environment.withCredentials,
    });
  }

  updatePersonalInformation(updatedPersonalInformation: PersonalInformation): Observable<PersonalInformation> {
    return this.http.put<PersonalInformation>(this.informationUrl, updatedPersonalInformation ,{
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    })
  }

}
