import { Component, OnInit } from '@angular/core';
import { HighScoresService } from '../high-scores.service';
import { HighScore } from '../types/highscore.type';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.scss']
})
export class HighScoresComponent implements OnInit {
  highScores: HighScore[] = [];

  constructor(private highScoresService: HighScoresService) { }

  ngOnInit(): void {
    this.highScoresService.get().subscribe(resp => this.highScores = resp);
  }
}
