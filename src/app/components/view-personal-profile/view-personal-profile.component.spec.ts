import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PostService } from 'src/app/services/post.service';
import { defer } from 'rxjs';
import { ViewPersonalProfileComponent } from './view-personal-profile.component';
import User from 'src/app/models/User';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

describe('ViewPersonalProfileComponent', () => {
  let component: ViewPersonalProfileComponent;
  let fixture: ComponentFixture<ViewPersonalProfileComponent>;

  let user:User = { id:1, email: `test@gmail.com`, firstName:`Jan`, lastName:`Hus`, biography:"", hometown: '',currentResidence:"",birthday:new Date() , passwordResetToken: ""}

  // Set up service spy for PostService
  let postServiceSpy:jasmine.SpyObj<PostService> = jasmine.createSpyObj("PostService", ["getUserPosts"]);

  

  postServiceSpy.getAllPosts.and.returnValue( defer( () => Promise.resolve(
        [
          { id: 1, text: `test`, imageUrl: `test`, author: user, comments: [], postType: `test` },
          { id: 2, text: ``, imageUrl: ``, author: user, comments: [], postType: `` }
        ]
      )
    )
  )

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [``],
      declarations: [ ViewPersonalProfileComponent ],
      providers:[AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPersonalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  xit('should return baseUrl', () => {
    expect(authServiceSpy.authUrl).toEqual(environment.baseUrl);
  });

  xit('should return user', () => {
    expect(authServiceSpy.currentUser.firstName).toEqual(user.firstName);
  });*/

  it('should create', () => {
  
    expect(component).toBeTruthy();
  });

  it('should have a list of posts greater than 0.', waitForAsync(


    () => {

      component.user = user;
      component.getUserPosts();
      fixture.whenStable().then(
        () => {
          expect(component.posts.length).toBeGreaterThan(0);
        }
      );
  
    }

  ))


});
