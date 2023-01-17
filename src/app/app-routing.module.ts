import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { ViewPersonalProfileComponent } from './components/view-personal-profile/view-personal-profile.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'post-feed', component: PostFeedPageComponent },
  { path: 'users/:userId', component: ProfileViewComponent },
  { path: 'my-profile', component: ViewPersonalProfileComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-password-form/:token', component: ResetPasswordFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// http://codepipeline-us-west-2-791209503483.s3-website-us-west-2.amazonaws.com/reset-password-form/qAOTRmaPY55exSpgen24YUe16dQadqDU9RcJ1viMPKGgd
