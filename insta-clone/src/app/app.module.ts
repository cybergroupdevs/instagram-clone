import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { FileSelectDirective } from 'ng2-file-upload';
import { HomenavComponent } from './homenav/homenav.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import {  ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { FeedComponent } from './feed/feed.component';
import { SuggestionForUComponent } from './suggestion-for-u/suggestion-for-u.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditProfileDetailsComponent } from './edit-profile-details/edit-profile-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileDashboardComponent,   
    ImageGalleryComponent,
    FeedComponent,
    HomenavComponent,
    SuggestionForUComponent,
    CreatePostComponent,
    FileSelectDirective,
    EditProfileComponent,
    EditProfileDetailsComponent,
    ChangePasswordComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }