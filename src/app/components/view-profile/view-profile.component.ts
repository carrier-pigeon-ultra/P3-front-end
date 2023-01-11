import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  authUser: User;
  profileUserId: number;
  profileUser: User;
  profileUserPostResponses: Post[] = [];
  isProfileViewerOwner: boolean = false;
  resultPage: number = 1;
  resultSize: number = 5;
  hasMoreResult: boolean = true;
  fetchingResult: boolean = false;
  loadingProfile: boolean = false;
  hasNoPost: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private matSnackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}
}
