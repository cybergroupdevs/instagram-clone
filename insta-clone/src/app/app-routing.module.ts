<<<<<<< HEAD
import { EditComponent } from './edit/edit.component';
=======
import { FileSelectDirective } from 'ng2-file-upload';
import { FeedComponent } from './feed/feed.component';
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
import { AppComponent } from './app.component';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent }      from './login/login.component';
import { SignupComponent }  from './signup/signup.component';

<<<<<<< HEAD



const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path: 'profile', component: ProfileDashboardComponent},
  {path: 'edit', component: EditComponent}
  ];

=======
const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full'},
  { path: 'feed', component: FeedComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileDashboardComponent}
];
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
<<<<<<< HEAD

export class AppRoutingModule { }
=======
export class AppRoutingModule{ }
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
