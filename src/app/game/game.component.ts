import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, doc, docData, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  /* pickCardAnimation = false;
  currentCard: string = ''; */
  game: Game;
  gameId: string;
  docRef: any;

  constructor(private route: ActivatedRoute, 
    private firestore: Firestore, public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe((params) => {
      this.gameId = params['id'];

      this.docRef = doc(collection(this.firestore, 'games'), this.gameId);
      docData(this.docRef).subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.players = game.players;
        this.game.playerImg = game.playerImg;
        this.game.playedCards = game.playedCards;
        this.game.stack = game.stack;
        this.game.currentCard = game.currentCard;
        this.game.pickCardAnimation = game.pickCardAnimation;
      });
    });
  }

  async newGame() {
    this.game = new Game();
  }

  takeCard() {
    if(!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();

      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.playedCards.push(this.game.currentCard);
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game.players.push(name);
        this.game.playerImg.push('1.webp');
        this.saveGame();
      }
    });
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if(change) {
        if(change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.playerImg.splice(playerId, 1);
        } else  {
          this.game.playerImg[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  saveGame() {
    updateDoc(this.docRef, this.game.toJson());
  }

}
