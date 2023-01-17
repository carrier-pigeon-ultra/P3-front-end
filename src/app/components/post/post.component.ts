import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  commentForm = new FormGroup({
    text: new FormControl(''),
  });

  @Input('post') post: Post;
  replyToPost: boolean = false;


  postBelongsToAuthUser:boolean;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.postBelongsToAuthUser = (this.post && this.authService.getCurrentUser().id === this.post.author.id )

  }

  toggleReplyToPost = () => {
    this.replyToPost = !this.replyToPost;
  };

  deletePost():void {
    if(this.postBelongsToAuthUser) {
      this.postService.deleteUserPost(this.authService.getCurrentUser(), this.post).subscribe(
        {
          error: (error) => { console.log(error) }
        }
      );
      location.reload();
    }
  }

  submitReply = (e: any) => {
    e.preventDefault();
    let newComment = new Post(
      0,
      this.commentForm.value.text || '',
      '',
      this.authService.currentUser,
      [],
      'Comment'
    );
    this.postService
      .upsertPost({
        ...this.post,
        comments: [...this.post.comments, newComment],
      })
      .subscribe((response) => {
        this.post = response;
        this.toggleReplyToPost();
      });
  };
}
