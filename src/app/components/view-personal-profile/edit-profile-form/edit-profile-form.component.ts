import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { EditUserService } from 'src/app/services/edit-user.service';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css']
})
export class EditProfileFormComponent implements OnInit {

  user:User;

  editProfileForm:FormGroup;
  @Output() editComplete = new EventEmitter<boolean>(); 

  

  constructor(private authService:AuthService, private editUserService:EditUserService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.updateForm();
  }

  onSave(event:any):void {
    // Fill user fields with form values
    this.user.email = this.editProfileForm.value.email;
    this.user.firstName = this.editProfileForm.value.firstName;
    this.user.lastName = this.editProfileForm.value.lastName;
    this.user.birthday = this.editProfileForm.value.birthday;
    this.user.hometown = this.editProfileForm.value.hometown;
    this.user.currentResidence = this.editProfileForm.value.currentResidence;
    this.user.biography = this.editProfileForm.value.biography;

    this.editUserService.updateUserProfile(this.user).subscribe(
      {
        next: (response) => { 
          //this.user = response as User
          localStorage.setItem('authUser',JSON.stringify(this.user))
        },
        error: (error) => { console.log(error)}
      }
    )

    this.editComplete.emit(true);
    this.updateForm();

  }

  updateForm() : void {
    this.editProfileForm = new FormGroup({
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      email: new FormControl(this.user.email),
      birthday: new FormControl(this.user.birthday),
      hometown:new FormControl(this.user.hometown),
      currentResidence: new FormControl(this.user.currentResidence),
      biography: new FormControl(this.user.biography)
      
    })
  }

}
