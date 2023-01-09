import { Component, OnInit } from '@angular/core';
import PersonalInformation from 'src/app/models/PersonalInformation';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PersonalInformationService } from 'src/app/services/personal-information.service';


@Component({
  selector: 'app-personal-information-card',
  templateUrl: './personal-information-card.component.html',
  styleUrls: ['./personal-information-card.component.css']
})
export class PersonalInformationCardComponent implements OnInit {

  user:User;
  personalInformation:PersonalInformation;
  edit:boolean;

  constructor(private personalInformationService:PersonalInformationService,
    private authService:AuthService ) { }

  ngOnInit(): void {
    this.edit = false;
    this.user = this.authService.currentUser;
    this.personalInformationService
      .getPersonalInformation()
      .subscribe({
        next: (response) => { this.personalInformation = response },
        error: (error) => { 
          console.log(error);
          this.personalInformation = new PersonalInformation(-1,0," ", " "," ");
         }
        
      })
  }

  editTrue():void {
    this.edit = true;
  }

  editFalse():void {
    this.edit = false;
  }

}
