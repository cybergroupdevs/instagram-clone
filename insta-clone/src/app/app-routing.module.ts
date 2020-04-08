
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CreatePostComponent } from './create-post/create-post.component';
//import { FileSelectDirective } from 'ng2-file-upload';
import { FeedComponent } from './feed/feed.component';
import { AppComponent } from './app.component';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent }      from './login/login.component';
import { SignupComponent }  from './signup/signup.component';
import {ChangePasswordComponent} from './change-password/change-password.component'
import { EditProfileDetailsComponent } from './edit-profile-details/edit-profile-details.component';
import {ViewPostComponent} from './view-post/view-post.component'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'feed', component: FeedComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile/:id', component: ProfileDashboardComponent},
  { path: 'uploadPost', component: CreatePostComponent},

  { path: "accounts/edit", component: EditProfileComponent, children:[
    {
      path: "", redirectTo: "editProfileDetails", pathMatch: "full"
    },
    {
      path: "editProfileDetails", component:EditProfileDetailsComponent
    },
    {
      path: "changePassword", component:ChangePasswordComponent 
    }
  ]},
  {path:"post/id", component:ViewPostComponent}
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule{ }

