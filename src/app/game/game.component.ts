import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

import logoNames from './game.logos';
import { Card } from '../types/card.type';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
	public gameSize: number;
	public cards: Card[] = [];
	isFlipped = false;

	constructor(private gameService: GameService) { }

	public ngOnInit(): void {
		this.gameSize = this.gameService.gameSize;
		const deck = this.getRandomCards(logoNames, this.gameSize);
		const shuffledCardPairsDeck = this.shuffleCards([...deck, ...deck]);
		this.cards = shuffledCardPairsDeck.map((cardName, index) => ({
			id: index,
			name: cardName,
			isFound: false,
			isShown: false,
		}));
	}

	// stackoverflow
	private getRandomCards(cardsArray: string[], numberOfDecks: number): string[] {
		const cards = [...cardsArray];
		const result = new Array(numberOfDecks);
		let length = cards.length;
		const taken = new Array(length);
		while (numberOfDecks--) {
			const x = Math.floor(Math.random() * length);
			result[numberOfDecks] = cards[x in taken ? taken[x] : x];
			taken[x] = --length in taken ? taken[length] : length;
		}
		return result;
	}

	private shuffleCards(cardsArray: string[]): string[] {
		const array = [...cardsArray];
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
}
