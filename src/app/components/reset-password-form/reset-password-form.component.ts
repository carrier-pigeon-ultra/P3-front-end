import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css'],
})
export class ResetPasswordFormComponent implements OnInit {
  passwordForm = new FormGroup({
    password: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  submit() {
    let newPassword = this.passwordForm.value.password;
  }
}
