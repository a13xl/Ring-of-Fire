import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  game: any;

  constructor(private firestore: Firestore, private router: Router) { }

  async newGame() {
    let game = new Game();
    let coll = collection(this.firestore, 'games');

    addDoc(coll, game.toJson()).then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
    

  }

  legalNotice() {
    this.router.navigateByUrl('/legal-notice');
  }
}
