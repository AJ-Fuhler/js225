/*

- Twenty-one is a card game with a dealer and a player.
- The participants try to get as close to 21 points as possible without going over.
- The game starts by dealing cards from a 52-card deck consisting of cards from 4 suits of 13 ranks each.
- Both Participants receive two cards:
  - The dealer hides one of his cards (places it face-down) so that the player can't see what it is.
  - The player can see both of his cards.

- The player takes the first turn, and can hit or stay:
  - If the player hits, he gets another cards, and again has the opportunity to hit (get another card) or stay.
  - If the player goes over 21 points, he busts.
  - If the player stays, the dealer plays next.

- If the player didn't bust, it's now the dealer's turn:
  - The dealer reveals his face-down card.
  - If the dealer's total points are less than 17, he must hit and receive another card.
  - If the dealer goes over 21 points, he busts.
  - If the dealer has 17 points or more, he must stay.

- results of the game are determined.


Nouns and associated verbs:
- dealer
  - hide
  - reveal
  - bust
  - stay
- player
  - take turn
  - hit
  - stay
  - bust
- cards
  - deal
- card-deck
  - shuffle

*/

let shuffle = require('shuffle-array'),
    readline = require('readline-sync');

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.hidden = false;
  }
  
  hide() {
    this.hidden = true;
  }

  reveal() {
    this.hidden = false;
  }

  isAce() {
    return this.rank === 'Ace';
  }
  
  isFaceCard() {
    return ['Jack', 'Queen', 'King'].includes(this.rank);
  }

  isNumberCard() {
    return !(this.isAce() && this.isFaceCard);
  }

  toString() {
    if (this.hidden) {
      return 'Hidden';
    }
    return this.rank + ' of ' + this.suit;
  }
}

class Deck {
  static suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  static ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10',
    'Jack', 'Queen', 'King', 'Ace',
  ];

  constructor() {
    this.reset();
  }

  reset() {
    this.cards = [];
    for (let suit of Deck.suits) {
      for (let rank of Deck.ranks) {
        this.cards.push(new Card(rank, suit));
      }
    }

    shuffle(this.cards);
  }

  deal(amount) {
    let cardsToGive = [];
    for (let count = 0; count < amount; count += 1) {
      cardsToGive.push(this.cards.pop());
    }

    return cardsToGive;
  }

  
}

class Participant {
  constructor() {
    this.hand = [];
    this.money = 5;
  }

  showHand() {
    this.hand.forEach(card => {
      console.log(card.toString());
    });
  }

  getMoney() {
    return this.money;
  }

  incrementMoney() {
    this.money += 1;  
  }

  decreaseMoney() {
    this.money -= 1;
  }
  
  clearHand() {
    this.hand = [];
  }
}

class Player extends Participant {
  constructor() {
    super();
  }
}

class Dealer extends Participant {
  constructor() {
    super();
  }
}


class Game {
  
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }
  
  play() {
    this.displayWelcomeMessage();
    this.pressToContinue();
    
    while (true) {
      this.playRound();
      this.displayCardsAndMoneyWithClear();
      this.displayWinner();
      if (!(this.bothHaveMoney() && this.playAgain())) break;
    }
  }

  playRound() {
    while (true) {
      console.clear();
      this.deck.reset();
      this.clearHands();
      this.dealInitialHand();
      this.displayCardsAndMoney();
      this.playerTurn();
      if (this.busted(this.player)) break;
      
      this.dealerTurn();
      break;
    }
  }  
  
  clearHands() {
    this.player.clearHand();
    this.dealer.clearHand();
  }

  displayWinner() {
    let dealerTotal = this.calculatePointsInHand(this.dealer);
    let playerTotal = this.calculatePointsInHand(this.player);
    let winner;
    if (this.busted(this.dealer)) {
      console.log('The dealer busted! You won this round!');
      winner = this.player;
    } else if (this.busted(this.player)) {
      console.log('You busted! The dealer won this round!');
      winner = this.dealer;
    } else if (dealerTotal > playerTotal) {
      console.log('The dealer had a higher score than you! The dealer won this round!');
      winner = this.dealer;
    } else if (playerTotal > dealerTotal) {
      console.log('You had a higher score than the dealer! You win this round!');
      winner = this.player;
    } else if (playerTotal === dealerTotal) {
      console.log('You tied this round!');
    }
    
    if (winner === this.dealer) {
      this.dealer.incrementMoney();
      this.player.decreaseMoney();
    } else if (winner === this.player) {
      this.dealer.decreaseMoney();
      this.player.incrementMoney();
    }
  }

  dealInitialHand() {
    this.player.hand.push(...this.deck.deal(2));
    this.dealer.hand.push(...this.deck.deal(2));
    this.dealer.hand[1].hide();
  }

  dealOneCard(player) {
    player.hand.push(...this.deck.deal(1));
  }

  displayCardsAndMoney() {
    console.log("Dealer's cards:");
    this.dealer.showHand();
    console.log()
    this.revealPoints(this.dealer);
    console.log(`The dealer has $${this.dealer.getMoney()}!`);
    console.log();
    console.log("Your cards:");
    this.player.showHand();
    console.log();
    this.revealPoints(this.player);
    console.log(`You have $${this.player.getMoney()}!`);
  }

  determineCardValue(card) {
    if (card.hidden) return 0;
    if (card.isAce()) return 11;
    if (card.isFaceCard()) return 10;
    if (card.isNumberCard()) return Number(card.rank);
  }

  calculatePointsInHand(player) {
    let total = 0;
    let aceCount = 0;
    for (let card of player.hand) {
      let value = this.determineCardValue(card);
      if (card.hidden === false & card.isAce()) {
        aceCount += 1;
      }
      total += value;
    }
    while (total > 21 && aceCount > 0) {
      total -= 10;
      aceCount -= 1;
    }

    return total;
  }
  
  revealPoints(player) {
    let points = this.calculatePointsInHand(player);
    console.log('Points: ' + points);
  }
  
  pressToContinue() {
    console.log('Press enter to continue!');
    readline.question();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Twenty-one!');
  }

  busted(player) {
    return this.calculatePointsInHand(player) > 21;
  }

  bothHaveMoney() {
    return this.player.getMoney() > 0 && this.dealer.getMoney() > 0;
  }

  playAgain() {
    let prompt = 'Play Again? (y/n)\n';
    let answer = readline.question(prompt);
    
    while (!['y', 'n'].includes(answer)) {
      console.log('That is not a valid option.')
      answer = readline.question(prompt);
    }
   
    return answer === 'y';
  }
  
  displayCardsAndMoneyWithClear() {
    console.clear();
    this.displayCardsAndMoney();
  }

  playerTurn() {
    while (!this.busted(this.player)) {
      let answer = readline.question('Hit or Stay? (h/s)\n').toLowerCase();
      while (!['h', 's'].includes(answer)) {
        console.log('That is not a valid option.\n');
        answer = readline.question('Hit or Stay? (h/s)\n');
      }
      if (answer === 'h') {
        this.dealOneCard(this.player);  
        this.displayCardsAndMoneyWithClear();
      } else {
        break;
      }
    }
  }

  dealerTurn() {
    this.dealer.hand[1].reveal();
    this.displayCardsAndMoneyWithClear();
    let pointTotal = this.calculatePointsInHand(this.dealer);
    this.pressToContinue();
    while (!this.busted(this.dealer) && pointTotal < 17) {
      this.dealOneCard(this.dealer);
      this.displayCardsAndMoneyWithClear();
      pointTotal = this.calculatePointsInHand(this.dealer);
      if (this.busted(this.dealer)) break;
      this.pressToContinue();
    }
  }
}


let game = new Game();
game.play();
