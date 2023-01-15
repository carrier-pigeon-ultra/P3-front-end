import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  

  badLoginAttempt:boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.badLoginAttempt = false;
  }
  
  onSubmit(e: any): void {
    e.preventDefault()
    this.authService.login(this.loginForm.value.email || "", this.loginForm.value.password || "")
      .subscribe(
        {
          next: (response) => {
            this.authService.currentUser = response
            this.router.navigate(['post-feed'])
          },
          error: (error) => {
            console.log(error);
            this.badLoginAttempt = true;
          }
        }
      )
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
