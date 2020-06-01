import { Component, OnInit } from '@angular/core';
import { HighScoresService } from '../high-scores.service';
import { HighScore } from '../types/highscore.type';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.scss'],
})
export class HighScoresComponent implements OnInit {
  public highScores: HighScore[] = [];

  constructor(private highScoresService: HighScoresService) { }

  public ngOnInit(): void {
	this.highScoresService.get().subscribe((resp) => this.highScores = resp);
  }
}
