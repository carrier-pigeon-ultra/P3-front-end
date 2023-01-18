import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import User from 'src/app/models/User';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Overlay } from '@angular/cdk/overlay';
import { MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material/dialog';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { defer } from 'rxjs';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpyObj;
  let serachString = 'J';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
      declarations: [ NavbarComponent],
      providers: [ AuthService, FormBuilder, MatDialog, Overlay]
    })
    .compileComponents();

    let author:User = new User(0,"email","Jan","Hus",new Date(), "A", "A", "");
    authServiceSpyObj = jasmine.createSpyObj("AuthService", ['getUserSearchResult'])
    authServiceSpyObj.currentUser = new User(0,"email","Jan","Hus",new Date(), "A", "A", "");;

    // To parse observables
    function asyncData<T>(data:T) {
      return defer( () => Promise.resolve(data) )
    }

    authServiceSpyObj.getUserSearchResult.and.returnValue(
      [
        new User(1,"email","Jan","Hus",new Date(), "A", "A", ""),
        new User(2,"email","John","Richardson",new Date(), "A", "A", "")
      ]
    )

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  

});

