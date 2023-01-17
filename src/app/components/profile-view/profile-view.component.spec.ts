import { ComponentFixture, TestBed } from '@angular/core/testing';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { UserResponse } from 'src/app/models/userresponse';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileViewComponent } from './profile-view.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { defer } from 'rxjs';

describe('ProfileViewComponent', () => {
  let component: ProfileViewComponent;
  let fixture: ComponentFixture<ProfileViewComponent>;
  /*let dummyRouter:ActivatedRoute = {
    snapshot: {
      paramMap: convertToParamMap({ id:'userId'})
    }
  };*/

  

  let postServiceSpyObj;
  let authService;
  let userServiceSpyObj;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileViewComponent ],
      imports:[ HttpClientTestingModule ],
      providers: [ AuthService, PostService, UserResponse, UserService, 
        { provide: ActivatedRoute, useValue: {
          snapshot: {
            params: { 'userId': 1}
          }
        } 
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

     // To parse observables
    function asyncData<T>(data:T) {
      return defer( () => Promise.resolve(data) )
    }

    authService = TestBed.inject(AuthService);
    authService.currentUser = new User(0,"email","Jan","Hus",new Date(), "A", "A", "");

    postServiceSpyObj = jasmine.createSpyObj<PostService>('PostService',[ 'getUserPosts'])
    postServiceSpyObj.getAllPosts.and.returnValue(asyncData([new Post(0,"","",authService.currentUser,[],'COMMENT'),
      new Post(2,"","",authService.currentUser,[],'COMMENT')]));

    userServiceSpyObj = jasmine.createSpyObj<UserService>('UserService', ['getUserById'])
    userServiceSpyObj.getUserById.and.returnValue(asyncData(authService.currentUser));


    

  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
