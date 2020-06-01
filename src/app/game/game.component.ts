import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

import logoNames from './game.logos';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameSize: number;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameSize = this.gameService.gameSize;
  }
}
