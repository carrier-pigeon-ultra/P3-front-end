
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  user: User = {} as User;

  enteredSearchValue: string = '';

  constructor(private authService: AuthService, private router:Router) { }


  ngOnInit(): void {

    console.log('UserCard init.');
    console.log(this.authService.currentUser);

    this.user = this.authService.getCurrentUser();
  }

  ngOnChange(): void {
    this.user = this.authService.getCurrentUser();
  }

  loadViewPersonalProfileComponent(): void {
    this.router.navigate([`my-profile`]);
  }


}
