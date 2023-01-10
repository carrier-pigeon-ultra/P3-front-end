import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css'],
})
export class ResetPasswordFormComponent implements OnInit {
  passwordForm = new FormGroup({
    password: new FormControl(''),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {}

  submit() {
    let newPassword = this.passwordForm.value.password;
    this.router.navigate(['/login']);
  }
}
