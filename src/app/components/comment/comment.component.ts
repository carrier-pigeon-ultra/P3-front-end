import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  commentForm = new FormGroup({
    text: new FormControl(''),
  });

  @Input('comment') inputComment: Post;
  replyToComment: boolean;
  commentBelongsToAuthUser:boolean;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.commentBelongsToAuthUser = (this.authService.getCurrentUser().id === this.inputComment.author.id );
    this.replyToComment = false;

  }

  toggleReplyToComment = () => {
    this.replyToComment = !this.replyToComment;
  };

  submitReply = (e: any) => {
    e.preventDefault();
    let newComment = new Post(
      0,
      this.commentForm.value.text || '',
      '',
      this.authService.getCurrentUser(),
      [],
      'Reply'
    );
    this.postService
      .upsertPost({
        ...this.inputComment,
        comments: [...this.inputComment.comments, newComment],
      })
      .subscribe((response) => {
        this.inputComment = response;
        this.toggleReplyToComment();
      });
  };

  deletePost():void {
    if(this.commentBelongsToAuthUser) {
      this.postService.deleteUserPost(this.authService.currentUser, this.inputComment).subscribe(
        {
          error: (error) => { console.log(error) }
        }
      );
      location.reload();
    }
  }
}
