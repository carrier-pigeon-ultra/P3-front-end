import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CommentComponent } from './comment.component';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { defer, Observable } from 'rxjs';

describe('CommentComponent', () => {


  

  let authService = jasmine.createSpyObj<AuthService>('AuthService', ['getCurrentUser'])
  let author:User = { id: 0, email:"email", firstName:"John", lastName:'Wiliamson', biography:"", 
  passwordResetToken:'', hometown:"", currentResidence:"", birthday: new Date(),} as User;
    authService.getCurrentUser.and.returnValue(author)

  localStorage.setItem('authUser',JSON.stringify(author))
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  
  
  let postServiceSpyObj = jasmine.createSpyObj<PostService>('PostService',[ 'upsertPost', 'deleteUserPost']);
  let toUpsert:Post;
  let e = jasmine.createSpyObj('e', ['preventDefault'])
 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CommentComponent ],
      providers: [ AuthService, PostService ]
    })
    .compileComponents();

    

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;

    // Hand component parent post.
    component.inputComment = new Post(0,"","",author,[],'COMMENT')

    fixture.detectChanges();

    // To parse observables
    function asyncData<T>(data:T) {
      return defer( () => Promise.resolve(data) )
    }

    // Setup Post service spy

      // Post to be upserted
    toUpsert =  new Post(0,"","",author,[],'COMMENT')
    postServiceSpyObj.upsertPost.and.returnValue(asyncData(toUpsert));

    // Mock e event.
    
  });

  it('should return author', () =>{
    expect(author).toBe(authService.getCurrentUser());
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set replyToComment to true and then to false again', () => {

    // Set to true
    component.toggleReplyToComment();
    expect(component.replyToComment).toBeTrue();

    // Set to false
    component.toggleReplyToComment();
    expect(component.replyToComment).toBeFalse();

  })

  it('should set input comment field to input comment', waitForAsync(() => {

        component.submitReply(e);

        fixture.whenStable().then( () => {

            expect(component.inputComment).toEqual(toUpsert);

          }

        )

      }
    )
  )

});
