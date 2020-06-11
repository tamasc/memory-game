import { Component, OnInit } from '@angular/core';
import { HighScoresService } from '../high-scores.service';
import { HighScore } from '../types/highscore.type';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-high-scores',
	templateUrl: './high-scores.component.html',
	styleUrls: ['./high-scores.component.scss'],
})
export class HighScoresComponent implements OnInit {
	public highScores: any;

	constructor(private highScoresService: HighScoresService) { }

	public ngOnInit(): void {
		this.highScoresService.get()
			.pipe(
				map(highScores => {
					const scoresByGameSize = highScores.reduce((acc, score) => {
						const { gameSize } = score;
						if (!acc[gameSize]) {
							acc[gameSize] = [];
						}
						acc[gameSize] = [...acc[gameSize], score];
						return acc;
					}, {});
					console.log(scoresByGameSize);
					return scoresByGameSize;
				}),
			)
			.subscribe((resp) => this.highScores = resp);
	}
}
