import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {
  gameSize = 3;

  constructor(
    private router: Router,

    ) { }

  ngOnInit(): void {
  }

  startNewGame() {
    this.router.navigate(['/game']);
  }

}
