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

  constructor() { }
}
