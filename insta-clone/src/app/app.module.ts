import { HomenavComponent } from './homenav/homenav.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import {  ImageGalleryComponent } from './image-gallery/image-gallery.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
    ProfileDashboardComponent,   
    ImageGalleryComponent,
    HomenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
