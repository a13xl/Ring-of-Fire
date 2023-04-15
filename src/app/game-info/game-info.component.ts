import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: '2 is for you', description: 'You decide who drinks' },
    { title: '3 is for me', description: 'You have to drink a shot!' },
    { title: '4 is for floor', description: 'Touch the tabletop with your thumb. The last player to touch the table must take a sip.' },
    { title: '5 is thumbmaster', description: 'You must place your thumb on the edge of the table at any time of your choosing without verbally telling the other players. The other players must watch all the time and also place their thumb on the table afterwards. The last player to place his/her thumb on the edge of the table must drink a shot.' },
    { title: '6 is for chicks', description: 'All girls drink.' },
    { title: '7 is heaven', description: 'Put your hands up! The last player drinks!' },
    { title: '8 is mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: '9 is rhyme', description: 'Pick a word. In a clockwise direction, the other players have to find a rhyme for it. Whoever repeats a word or can no longer name a new rhyme must drink a sip.' },
    { title: '10 is men', description: 'All men drink.' },
    { title: 'Rule', description: 'The person who draws a jack may make up a new rule of the game that applies until the end of the game. The rule may not override any others.' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Kingscup', description: 'If a king is drawn, the player may pour a drink of his choice into the Kingscup. If the fourth king is drawn, the player must immediately empty the Kingscup in the middle of the game.' },
  ];

  title: string = '';
  description: string = '';
  @Input() card: string;

  ngOnChanges(): void {
    if(this.card) {
      let cardNr = +this.card.split('_')[1];
      this.title = this.cardAction[cardNr - 1].title;
      this.description = this.cardAction[cardNr - 1].description;
    }
  }
}
