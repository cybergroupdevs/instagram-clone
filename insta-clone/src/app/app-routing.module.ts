import { AuthGuard } from './auth.guard';
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
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'feed', component: FeedComponent,canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile/:id', component: ProfileDashboardComponent,canActivate:[AuthGuard]},
  { path: 'uploadPost', component: CreatePostComponent,canActivate:[AuthGuard]},

  { path: "accounts/edit", component: EditProfileComponent, children:[
    {
      path: "", redirectTo: "editProfileDetails", pathMatch: "full",canActivate:[AuthGuard]
    },
    {
      path: "editProfileDetails", component:EditProfileDetailsComponent,canActivate:[AuthGuard]
    },
    {
      path: "changePassword", component:ChangePasswordComponent,canActivate:[AuthGuard] 
    }
  ]}
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule{ }

