import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { UserResponse } from 'src/app/models/userresponse';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AppConstants } from 'src/app/shared/app-constants';
import { MatSnackBarComponent } from '../mat-snack-bar/mat-snack-bar.component';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  userList: User[];
  authUser: User;
  profileUserId: number;
  profileUser: User;
  profileUserPostResponses: Post[] = [];
  isProfileViewerOwner: boolean = false;
  viewerFollowsProfileUser: boolean = false;
  resultPage: number = 1;
  resultSize: number = 5;
  hasMoreResult: boolean = true;
  fetchingResult: boolean = false;
  loadingProfile: boolean = false;
  hasNoPost: boolean = false;
  user: User[] = [];

  private subscriptions: Subscription[] = [];
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private matSnackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void { /*
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/login');
    } else {
      this.loadingProfile = true;
      this.authUser = this.authService.getAuthUserFromCache();

      if (this.activatedRoute.snapshot.paramMap.get('userId') === null) {
        this.isProfileViewerOwner = true;
        this.profileUserId = this.authService.getAuthUserId();
      } else {
        this.profileUserId = Number(
          this.activatedRoute.snapshot.paramMap.get('userId')
        );
      }

      this.subscriptions.push(
        this.userService.getUserById(this.profileUserId).subscribe({
          next: (foundUserResponse: UserResponse) => {
            const foundUser: User = foundUserResponse;

            if (foundUser.id === this.authUser.id) {
              this.router.navigateByUrl('/profile');
            }

            // this.viewerFollowsProfileUser =
            //   foundUserResponse.followedByAuthUser;

            // if (!foundUser.profilePhoto) {
            //   foundUser.profilePhoto = environment.defaultProfilePhotoUrl;
            // }

            // if (!foundUser.coverPhoto) {
            //   foundUser.coverPhoto = environment.defaultCoverPhotoUrl;
            // }

            this.profileUser = foundUser;

            this.loadProfilePosts(1);

            this.loadingProfile = false;
          },
          error: (errorResponse: HttpErrorResponse) => {
            localStorage.setItem(
              AppConstants.messageTypeLabel,
              AppConstants.errorLabel
            );
            localStorage.setItem(
              AppConstants.messageHeaderLabel,
              AppConstants.notFoundErrorHeader
            );
            localStorage.setItem(
              AppConstants.messageDetailLabel,
              AppConstants.notFoundErrorDetail
            );
            localStorage.setItem(
              AppConstants.toLoginLabel,
              AppConstants.falseLabel
            );
            this.loadingProfile = false;
            this.router.navigateByUrl('/message');
          },
        })
      );
    }*/
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadProfilePosts(currentPage: number): void {
    if (!this.fetchingResult) {
      this.fetchingResult = true;
      this.subscriptions.push(
        this.userService
          .getUserPosts(this.profileUserId, currentPage, this.resultSize)
          .subscribe({
            next: (postResponses: Post[]) => {
              postResponses.forEach((post) =>
                this.profileUserPostResponses.push(post)
              );
              if (postResponses.length <= 0 && this.resultPage === 1)
                this.hasNoPost = true;
              if (postResponses.length <= 0) this.hasMoreResult = false;
              this.fetchingResult = false;
              this.resultPage++;
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.matSnackbar.openFromComponent(MatSnackBarComponent, {
                data: AppConstants.snackbarErrorContent,
                panelClass: ['bg-danger'],
                duration: 5000,
              });
            },
          })
      );
    }
  }
}
