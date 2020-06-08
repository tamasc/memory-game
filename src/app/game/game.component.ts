import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { getTimeFromTimestamp } from '../utils/helpers';

import logoNames from './game.logos';
import { Card } from '../types/card.type';
import { MatDialog } from '@angular/material/dialog';
import { GameWonDialogComponent } from '../game-won-dialog/game-won-dialog.component';
import { HighScore } from '../types/highscore.type';
import { HighScoresService } from '../high-scores.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
	public gameSize: number;
	public cards: Card[] = [];
	public gameTime = '0 : 0';
	private gameTimeStamp: number;
	public steps = 0;
	private gameStartTimeStamp: number;
	private firstFlippedCard: null | Card = null;
	private flipAllTimeoutId: any = null;
	private gameTimeInterval: any;
	private foundPairs = 0;

	constructor(
		private gameService: GameService,
		private highScoresService: HighScoresService,
		public dialog: MatDialog,
	) { }

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
		this.startNewGame();
	}

	private startNewGame(): void {
		clearInterval(this.gameTimeInterval);
		this.foundPairs = 0;
		this.gameStartTimeStamp = (new Date()).getTime();
		this.gameTimeInterval = setInterval(() => {
			this.updateTime();
		}, 1000);
		this.steps = 0;
	}

	private updateTime() {
		const currentTimeStamp = (new Date()).getTime();
		this.gameTimeStamp = currentTimeStamp - this.gameStartTimeStamp;
		this.gameTime = getTimeFromTimestamp(this.gameTimeStamp);
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
		if (card.isFound || card.isFlipped) {
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
			this.steps++;
			this.foundPairs++;
			if (this.foundPairs === this.gameSize) {
				clearInterval(this.gameTimeInterval);
				this.wonTheGame();
			}
			return;
		} else if (this.firstFlippedCard && this.firstFlippedCard.name !== card.name) {
			// 3.2 case: no pairs found (need to show the card fow a while)
			card.isFlipped = true;
			this.firstFlippedCard = null;
			this.flipAllTimeoutId = setTimeout(this.unFlipAllCards.bind(this), 2000);
			this.steps++;
		}
	}

	private wonTheGame() {
		const dialogRef = this.dialog.open(GameWonDialogComponent, {
			width: '250px',
			data: {
				name: this.gameService.name,
				time: this.gameTimeStamp,
				steps: this.steps,
			},
		});

		dialogRef.afterClosed().subscribe((result: HighScore) => {
			this.highScoresService.save(result);
		});
	}
}
