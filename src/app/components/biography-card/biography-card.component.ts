import { Component, OnInit, Output } from '@angular/core';
import PersonalInformation from 'src/app/models/PersonalInformation';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PersonalInformationService } from 'src/app/services/personal-information.service';

@Component({
  selector: 'app-biography-card',
  templateUrl: './biography-card.component.html',
  styleUrls: ['./biography-card.component.css']
})
export class BiographyCardComponent implements OnInit {

  @Output() user:User;
  personalInformation:PersonalInformation;
  @Output() doneEditing:boolean;

  constructor(private personalInformationService:PersonalInformationService, 
    private authService:AuthService ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.personalInformationService.getPersonalInformation().subscribe(
        {
          next: (response) => { this.personalInformation = response },
          error: (error) => {
            console.log(error);
            this.personalInformation = new PersonalInformation(-1,0," ", " ", "  ");
          }
        }
    )
  }


  updateBiography():void {
    this.personalInformationService.updatePersonalInformation(this.personalInformation).subscribe(
      {
        next: () => {console.log(`${this.user.email} updated biography.`)},
        error: (error) => { console.log(error); console.log(`${this.user.email} biography update failed.`)}
        
      }
    )

    this.personalInformationService.getPersonalInformation().subscribe(
      {
        next: (response) => { this.personalInformation = response },
        error: (error) => {
          console.log(error);
        }
      }
  )

  }
  



}
