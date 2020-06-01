import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {
  gameSize: number;

  constructor(
    private router: Router,
    private gameService: GameService,
    ) { }

  ngOnInit(): void {
    this.gameSize = this.gameService.gameSize;
  }

  startNewGame() {
    this.gameService.gameSize = this.gameSize;
    this.router.navigate(['/game']);
  }
}
