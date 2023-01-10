
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
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
  constructor(private authService: AuthService) {}


  constructor(private authService: AuthService, private router:Router) { }


  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

  loadViewPersonalProfileComponent(): void {
    this.router.navigate([`my-profile`]);
  }


}
