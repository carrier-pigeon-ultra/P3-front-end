import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { UserResponse } from 'src/app/models/userresponse';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  user:User;
  posts:Post[] = [];

  constructor(private router:ActivatedRoute, private postService:PostService,
    private userService:UserService) {
      

     }

  

  ngOnInit(): void {
      this.userService.getUserById(
        Number(this.router.snapshot.params['userId']).valueOf()
        ).subscribe(
         
            
         (response) => {   console.log(response)

          this.user = response;
          
         }
             
        
      
      );

      this.getUserPosts();
    
    
  }

    

  getUserPosts():void {
    this.postService.getUserPosts(this.user).subscribe( 
      (response) => { this.posts = response; },
      //error: (error) => { console.log(error); }
    )
  }

}
