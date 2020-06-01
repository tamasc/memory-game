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
	private firstFlippedCard: null | Card = null;
	private flipAllTimeoutId: any = null;

	constructor(private gameService: GameService) { }

	public ngOnInit(): void {
		this.gameSize = this.gameService.gameSize;
		const deck = this.getRandomCards(logoNames, this.gameSize);
		const shuffledCardPairsDeck = this.shuffleCards([...deck, ...deck]);
		this.cards = shuffledCardPairsDeck.map((cardName, index) => ({
			id: index,
			name: cardName,
			isFound: false,
			isFlipped: false,
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

	private unFlipAllCards() {
		clearTimeout(this.flipAllTimeoutId);
		this.flipAllTimeoutId = null;
		this.firstFlippedCard = null;
		this.cards.forEach(cardElem => cardElem.isFlipped = false);
		console.log(this.cards);
	}

	public flip(card: Card) {
		// 1. case: card is found
		if (card.isFound) {
			return;
		}
		// 4. case: previously no pairs found but cards are still shown (setTimeout)
		if (this.flipAllTimeoutId) {
			this.firstFlippedCard = null;
			this.unFlipAllCards();
		}
		// 2. case: first flip
		if (!this.firstFlippedCard) {
			this.firstFlippedCard = card;
			card.isFlipped = true;
			return;
		}
		// 3. case: second flip
		if (this.firstFlippedCard && this.firstFlippedCard.name === card.name) {
			// 3.1 case: a pair is found
			this.firstFlippedCard.isFound = true;
			card.isFound = true;
			this.firstFlippedCard = null;
			this.unFlipAllCards();
			return;
		} else if (this.firstFlippedCard && this.firstFlippedCard.name !== card.name) {
			// 3.2 case: no pairs found (need to show the card fow a while)
			card.isFlipped = true;
			this.firstFlippedCard = null;
			this.flipAllTimeoutId = setTimeout(this.unFlipAllCards.bind(this), 2000);
		}
	}
}
