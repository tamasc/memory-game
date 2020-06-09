import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HighScore } from './types/highscore.type';

@Injectable({
	providedIn: 'root',
})
export class HighScoresService {
	private highscoresUrl = environment.production ? '/api/highscores' : 'http://localhost:8080/api/highscores';

	constructor(private http: HttpClient) { }

	public get() {
		return this.http.get<HighScore[]>(this.highscoresUrl);
	}

	save(result: HighScore): void {
		this.http.post<HighScore>(this.highscoresUrl, JSON.stringify(result), {
			headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }),
		}).subscribe();
	}
}
