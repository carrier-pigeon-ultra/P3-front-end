import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm = new FormGroup({
    email: new FormControl(''),
  });

  constructor(
    private router: Router,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit(): void {}

  // onSubmit(e: any): void {
  //   e.preventDefault()
  //   this.resetPasswordForm.value.email || "")
  //     .subscribe(
  //       (response) => {
  //         response
  //         this.router.navigate(['/login'])
  //       }
  //     )
  // }

  submit() {
    let userEmail: string = this.resetPasswordForm.value.email!;
    console.log(userEmail);
    this.resetPasswordService.processForgotPasswordForm(userEmail, 'token');
    this.router.navigate(['/login']);
  }
}
