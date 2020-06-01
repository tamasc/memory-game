import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NewGameComponent } from './new-game/new-game.component';

@NgModule({
  declarations: [
	AppComponent,
	HighScoresComponent,
	GameComponent,
	NavBarComponent,
	NewGameComponent,
  ],
  imports: [
	BrowserModule,
	AppRoutingModule,
	HttpClientModule,
	FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
