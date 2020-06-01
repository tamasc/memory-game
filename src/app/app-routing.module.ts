import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { NewGameComponent } from './new-game/new-game.component';

const routes: Routes = [
  { path: 'highscores', component: HighScoresComponent },
  { path: 'new-game', component: NewGameComponent },
  { path: 'game', component: GameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
