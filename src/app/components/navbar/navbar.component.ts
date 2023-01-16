import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { AppConstants } from 'src/app/shared/app-constants';
import { environment } from 'src/environments/environment';
import { MatSnackBarComponent } from '../mat-snack-bar/mat-snack-bar.component';
import { SearchUserComponent } from '../search-user/search-user.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  searchResult: User[] = [];
  searchUserFormGroup: FormGroup;
  resultPage: number = 1;
  pageSize: number = 5;
  hasMoreResultPage: boolean = false;
  noResult: boolean = false;
  isValidFetchingResult: boolean = false;
  displayNoMoreResult: boolean = false;
  defaultProfilePhoto: string = environment.defaultProfilePictureUrl;
  @ViewChild('end-result') searchResultEl: ElementRef;
  @ViewChild('user-not-found') userNotFound: ElementRef;
  private subscriptions: Subscription[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private matSnackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.searchUserFormGroup = this.formBuilder.group({
      searchText: new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(55),
      ]),
    });
  }
  get searchText() {
    return this.searchUserFormGroup.get('searchText');
  }
  enteredSearchValue: string = '';
  searchBarClicked: boolean = false;

  openSearchBar() {
    this.matDialog.open(SearchUserComponent, {
      autoFocus: true,
      width: '500px',
    });
  }
  //Search bar part

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  //Search bar part

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
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
