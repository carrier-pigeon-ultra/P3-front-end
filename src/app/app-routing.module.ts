import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { ViewPersonalProfileComponent } from './components/view-personal-profile/view-personal-profile.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'post-feed', component: PostFeedPageComponent },
  { path: 'search-bar', component: SearchUserComponent },
  { path: "my-profile", component: ViewPersonalProfileComponent },
  { path: "profile", component: ProfileViewComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
