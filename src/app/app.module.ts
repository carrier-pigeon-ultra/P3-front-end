import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserInitialsPipe } from './pipes/user-initials.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FooterComponent } from './components/footer/footer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBarComponent } from './components/mat-snack-bar/mat-snack-bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewPersonalProfileComponent } from './components/view-personal-profile/view-personal-profile.component';
import { BiographyCardComponent } from './components/biography-card/biography-card.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { EditProfileFormComponent } from './components/view-personal-profile/edit-profile-form/edit-profile-form.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostFeedPageComponent,
    PostComponent,
    CommentComponent,
    UserCardComponent,
    NavbarComponent,
    UserInitialsPipe,
    SearchUserComponent,
    FooterComponent,
    MatSnackBarComponent,
    SearchUserComponent,
    FooterComponent,
    MatSnackBarComponent,
    ViewPersonalProfileComponent,
    BiographyCardComponent,
    ResetPasswordComponent,
    ResetPasswordFormComponent,
    ProfileViewComponent,
    EditProfileFormComponent,
    ProfileViewComponent,
    ViewProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    Ng2SearchPipeModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    Ng2SearchPipeModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

