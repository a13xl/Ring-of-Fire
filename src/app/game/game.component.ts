import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if(!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);
    }
  }
}
