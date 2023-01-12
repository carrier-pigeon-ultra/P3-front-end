import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordChangeService } from 'src/app/services/password-change.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css'],
})
export class ResetPasswordFormComponent implements OnInit {
  resetUrl: string = `${environment.baseUrl}/reset-password-form`;
  passwordForm = new FormGroup({
    password: new FormControl(''),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private passwordChange: PasswordChangeService
  ) {}

  ngOnInit(): void {}

  submit() {
    let newPassword: string = this.passwordForm.value.password!;
    let token: string = this.activatedRoute.snapshot.params['token'];
    this.passwordChange.resetPassword(newPassword, token);
    this.router.navigate(['/login']);
  }
}
