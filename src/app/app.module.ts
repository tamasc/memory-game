import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NewGameComponent } from './new-game/new-game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameWonDialogComponent } from './game-won-dialog/game-won-dialog.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
	AppComponent,
	HighScoresComponent,
	GameComponent,
	NavBarComponent,
	NewGameComponent,
	GameWonDialogComponent,
	NotFoundComponent,
  ],
  imports: [
	BrowserModule,
	AppRoutingModule,
	HttpClientModule,
	FormsModule,
	BrowserAnimationsModule,
	MatButtonModule,
	MatInputModule,
	MatDialogModule,
	MatToolbarModule,
	MatListModule,
  ],
  exports: [
	MatButtonModule,
	MatInputModule,
	MatDialogModule,
	MatToolbarModule,
	MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
