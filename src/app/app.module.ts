import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpotifyComponent } from './spotify/spotify.component';
import { AdminComponent } from './admin/admin.component';

import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { PlaylistsComponent } from './playlists/playlists.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    SpotifyComponent,
    AdminComponent,
    PlaylistsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSliderModule,
    MatCardModule,
    CdkAccordionModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatChipsModule,
    MatRadioModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
