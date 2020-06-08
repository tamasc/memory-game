import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HighScore } from './types/highscore.type';

@Injectable({
	providedIn: 'root',
})
export class HighScoresService {
	private highscoresUrl = '/api/highscores';

	constructor(private http: HttpClient) { }

	public get() {
		return this.http.get<HighScore[]>(this.highscoresUrl);
	}

	save(result: HighScore): void {
		this.http.put<HighScore>(this.highscoresUrl, result).subscribe();
	}
}
