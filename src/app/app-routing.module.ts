import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { NewGameComponent } from './new-game/new-game.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'highscores', component: HighScoresComponent },
  { path: 'new-game', component: NewGameComponent },
  { path: 'game', component: GameComponent },
  { path: '',   redirectTo: '/new-game', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
