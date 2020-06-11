import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
	private _gameSize = 18;

	get gameSize() {
		return this._gameSize;
	}

	set gameSize(size: number) {
		this._gameSize = size;
	}

	set name(name: string) {
		window.localStorage.setItem('szte-memory-game-name', name);
	}

	get name(): string {
		return window.localStorage.getItem('szte-memory-game-name') || 'player';
	}

	constructor() { }
}
