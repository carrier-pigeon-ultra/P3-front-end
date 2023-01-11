import { Component, OnInit } from '@angular/core';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  user:User;
  posts:Post[] = [];

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    
  }

  getUserPosts():void {
    this.postService.getUserPosts(this.user).subscribe( 
      (response) => { this.posts = response; },
    )
  }

  viewProfile(user:User): void {
    this.user = user;
    this.getUserPosts();
  }
}
