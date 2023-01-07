import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-personal-profile',
  templateUrl: './view-personal-profile.component.html',
  styleUrls: ['./view-personal-profile.component.css']
})
export class ViewPersonalProfileComponent implements OnInit {

  user:User = {} as User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

  

}
