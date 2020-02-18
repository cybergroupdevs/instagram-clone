<<<<<<< HEAD
import { HomenavComponent } from './homenav/homenav.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

=======
import { FileSelectDirective } from 'ng2-file-upload';
import { HomenavComponent } from './homenav/homenav.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import {  ImageGalleryComponent } from './image-gallery/image-gallery.component';
<<<<<<< HEAD
import { EditComponent } from './edit/edit.component';
import { AddPostComponent } from './add-post/add-post.component';
=======
import { FeedComponent } from './feed/feed.component';
import { SuggestionForUComponent } from './suggestion-for-u/suggestion-for-u.component';
import { CreatePostComponent } from './create-post/create-post.component';
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileDashboardComponent,   
    ImageGalleryComponent,
<<<<<<< HEAD
    HomenavComponent,
    EditComponent,
    AddPostComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
=======
    FeedComponent,
    HomenavComponent,
    SuggestionForUComponent,
    CreatePostComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
  ],
  providers: [],
  bootstrap: [AppComponent]
})
<<<<<<< HEAD
export class AppModule { }
=======
export class AppModule { }
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
