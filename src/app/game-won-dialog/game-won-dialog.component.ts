import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { getTimeFromTimestamp } from '../utils/helpers';
import GameData from '../types/gameData.type';

@Component({
  selector: 'app-game-won-dialog',
  templateUrl: './game-won-dialog.component.html',
  styleUrls: ['./game-won-dialog.component.scss']
})
export class GameWonDialogComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<GameWonDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: GameData,
	) {}

	submit(): void {
		this.dialogRef.close();
	}

	getTime() {
		return getTimeFromTimestamp(this.data.time);
	}
}
