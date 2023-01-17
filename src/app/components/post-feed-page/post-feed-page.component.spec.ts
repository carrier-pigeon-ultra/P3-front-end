import { ComponentFixture, TestBed } from '@angular/core/testing';
import { defer } from 'rxjs';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { PostService } from 'src/app/services/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostFeedPageComponent } from './post-feed-page.component';

describe('PostFeedPageComponent', () => {
  let component: PostFeedPageComponent;
  let fixture: ComponentFixture<PostFeedPageComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let testPost: Post;
  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj<PostService>("PostService",['upsertPost'])
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PostFeedPageComponent ],
      providers: [PostService]
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

  it('should be able to add posts', () => {
    
    component.submitPost(testPost);
    expect(postServiceSpy.upsertPost(testPost)).toHaveBeenCalled;


  });
  it('should be able to toggle for submitting a post',() => {
    component.toggleCreatePost()
    expect(component.createPost).toBeTrue;

    component.toggleCreatePost()
    expect(component.createPost).toBeFalse;
  });
});
