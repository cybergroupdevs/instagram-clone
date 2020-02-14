import { AppComponent } from './app.component';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{path: 'profile', component: ProfileDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
