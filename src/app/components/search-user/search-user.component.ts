import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SearchResponse } from 'src/app/models/search-response';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConstants } from 'src/app/shared/app-constants';
import { MatSnackBarComponent } from '../mat-snack-bar/mat-snack-bar.component';
import User from 'src/app/models/User';
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
})
export class SearchUserComponent implements OnInit {
  searchResult: User[] = [];
  searchUserFormGroup: FormGroup;
  resultPage: number = 1;
  pageSize: number = 5;
  hasMoreResultPage: boolean = false;
  noResult: boolean = false;
  isValidFetchingResult: boolean = false;
  displayNoMoreResult: boolean = false;
  defaultProfilePhoto: string = environment.defaultProfilePictureUrl;

  currentPage: number; // the current page number
  resultsPerPage: number; // the number of results to display per page
  totalResults: number; // the total number of search results
  private subscriptions: Subscription[] = [];
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private router: Router,
    private matSnackbar: MatSnackBar
  ) {}
  get searchText() {
    return this.searchUserFormGroup.get('searchText');
  }
  ngOnInit(): void {
    this.searchUserFormGroup = this.formBuilder.group({
      searchText: new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(55),
      ]),
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  SearchUser(page: number): void {
    if (!this.isValidFetchingResult) {
      if (this.searchText!.value.length >= 1) {
        this.isValidFetchingResult = true;

        if (page === 1) this.searchResult = [];

        this.subscriptions.push(
          this.authService
            .getUserSearchResult(this.searchText!.value, page, this.pageSize)
            .subscribe({
              next: (resultList: User[]) => {
                if (resultList.length == 0 && page === 1) {
                  this.noResult = true;
                } else {
                  this.noResult = false;
                }
                resultList.forEach((userResult) =>
                  this.searchResult.push(userResult)
                );
                this.resultPage++;
                this.isValidFetchingResult = false;

                if (resultList.length < this.pageSize) {
                  this.hasMoreResultPage = false;
                  this.resultPage = 1;
                } else {
                  this.hasMoreResultPage = true;
                }
              },
              error: (errorResponse: HttpErrorResponse) => {
                this.isValidFetchingResult = false;
                this.matSnackbar.openFromComponent(MatSnackBarComponent, {
                  data: AppConstants.snackbarErrorContent,
                  panelClass: ['bd-danger'],
                  duration: 5000,
                });
              },
            })
        );
      } else {
        this.matSnackbar.openFromComponent(MatSnackBarComponent, {
          data: 'Oops, search too short or long. Please try again. Search text must be between 1 and 55 characters long.',
          panelClass: ['bg-danger'],
          duration: 5000,
        });
      }
    }
  }
}
