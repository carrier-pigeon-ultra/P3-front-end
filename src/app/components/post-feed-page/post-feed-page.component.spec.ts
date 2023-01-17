import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { defer, Observable } from 'rxjs';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostFeedPageComponent } from './post-feed-page.component';

describe('PostFeedPageComponent', () => {
  let component: PostFeedPageComponent;
  let fixture: ComponentFixture<PostFeedPageComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let testPost: Post;
  let e = jasmine.createSpyObj('e',['preventDefault']);
  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj<PostService>("PostService",['upsertPost'])
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PostFeedPageComponent ],
      providers: [PostService, AuthService]
    })
    .compileComponents();
    testPost = new Post(
      2,
      "save me",
      '',
      new User(0,"email","Jan","Hus",new Date(), "A", "A", ""),
      [],
      'Top'
    );
    function asyncData<T>(data: T) {
      return defer(() => Promise.resolve(data));
    }
    postServiceSpy.upsertPost.and.returnValue(asyncData(testPost))
    fixture = TestBed.createComponent(PostFeedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to add posts', async() => {
    fixture.whenStable().then( () => {
    //component.submitPost(testPost);
    expect(postServiceSpy.upsertPost(testPost)).toHaveBeenCalled;

    })
  });
  it('should be able to toggle for submitting a post', async() => {
    fixture.whenStable().then( () => {
    component.toggleCreatePost()
    expect(component.createPost).toBeTrue;

    component.toggleCreatePost()
    expect(component.createPost).toBeFalse;
  })});
});
