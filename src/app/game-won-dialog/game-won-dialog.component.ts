import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { getTimeFromTimestamp } from '../utils/helpers';
import GameData from '../types/gameData.type';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-won-dialog',
  templateUrl: './game-won-dialog.component.html',
  styleUrls: ['./game-won-dialog.component.scss']
})
export class GameWonDialogComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<GameWonDialogComponent>,
		public gameService: GameService,
		@Inject(MAT_DIALOG_DATA) public data: GameData,
	) {}

	ngOnInit() {
		this.data.name = this.gameService.name || '';
	}

	submit(): void {
		this.gameService.name = this.data.name;
		this.dialogRef.close();
	}

	getTime() {
		return getTimeFromTimestamp(this.data.time);
	}
}
