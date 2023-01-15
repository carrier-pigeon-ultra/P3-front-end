import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    birthday: new FormControl(''),
    hometown:new FormControl(' '),
    currentResidence: new FormControl(' '),
    biography: new FormControl(' ')
    
  })
  
  badRegisterAttempt:boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.badRegisterAttempt = false;
  }
  
  onSubmit(e: any): void {
    e.preventDefault()
    this.authService.register(this.registerForm.value.firstName || "", this.registerForm.value.lastName || "", 
      this.registerForm.value.email || "", this.registerForm.value.password || "",
      new Date(this.registerForm.value.birthday || '01/01/0001'),
      this.registerForm.value.hometown || '', this.registerForm.value.currentResidence || '', this.registerForm.value.biography || ' ')
      .subscribe(
        {
          next: (response) => {
            this.router.navigate(['login'])
          },
          error: (error) => {
            this.badRegisterAttempt = true;
          }
        }
      )
  }

}
