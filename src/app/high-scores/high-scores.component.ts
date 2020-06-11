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
	public highScores: {gameSize: string, highScores: HighScore[]}[];

	constructor(private highScoresService: HighScoresService) { }

	public ngOnInit(): void {
		this.highScoresService.get()
			.pipe(
				map((highScores): {[key: string]: HighScore[]} => { // collect by gameSize
					return highScores.reduce((acc, score) => {
						const { gameSize } = score;
						if (!acc[gameSize]) {
							acc[gameSize] = [];
						}
						acc[gameSize] = [...acc[gameSize], score];
						return acc;
					}, {});
				}),
				map((scoresByGameSize): {[key: string]: HighScore[]} => { // sort
					Object.values(scoresByGameSize).forEach(scoreArray => {
						scoreArray.sort((a, b) => b.time - a.time);
						scoreArray.sort((a, b) => b.steps - a.steps);
					});
					return scoresByGameSize;
				}),
				map((scoresByGameSize): {gameSize: string, highScores: HighScore[]}[] => { // create array from the object
					return Object.entries(scoresByGameSize).map(([key, value]) => {
						return {
							gameSize: key,
							highScores: value,
						};
					});
				}),
			)
			.subscribe((resp) => this.highScores = resp);
	}
}
