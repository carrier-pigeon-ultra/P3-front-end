import { Component, OnInit } from '@angular/core';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-view-personal-profile',
  templateUrl: './view-personal-profile.component.html',
  styleUrls: ['./view-personal-profile.component.css']
})
export class ViewPersonalProfileComponent implements OnInit {

  user:User;
  posts:Post[] = [];

  constructor(private authService: AuthService, private postService:PostService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.getUserPosts();
  }

  getUserPosts():void {
    this.postService.getUserPosts(this.user).subscribe( 
      (response) => { this.posts = response; },
      //error: (error) => { console.log(error); }
    )
  }

}