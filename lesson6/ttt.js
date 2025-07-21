/*

- Tic Tac Toe is a 2 player board game.
- It is played on a 3x3 board.
- Players take turns marking a square with a marker that identifies the player.
- The first player to mark 3 squares in a row wins.
- A row can be horizontal, vertical, or either of the two diagonals.
- There is one human player and one computer player.
- The human player always moves first in the initial version of our game.

Nouns:

- game
- board
- Players
  - human
  - computer
- rows

Verbs:
- take turns
- mark (a square)
- player
-

Organize:

- Player
  - mark
  - play
  - human
  - computer
*/

let readline = require('readline-sync');

class Square {
  static UNUSED_SQUARE = ' ';
  static HUMAN_MARKER = 'X';
  static COMPUTER_MARKER = 'O';

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
}

class Board {
  constructor() {
    this.reset();
  }

  reset() {
    this.squares = {};
    for (let i = 1; i <= 9; i += 1) {
      this.squares[i] = new Square();
    }
  }

  display() {
    console.log();
    console.log('     |     |');
    console.log(`  ${this.squares[1]}  |  ${this.squares[2]}  | ${this.squares[3]}`)
    console.log('     |     |');
    console.log('-----+-----+-----')
    console.log('     |     |');
    console.log(`  ${this.squares[4]}  |  ${this.squares[5]}  | ${this.squares[6]}`)
    console.log('     |     |');
    console.log('-----+-----+-----')
    console.log('     |     |');
    console.log(`  ${this.squares[7]}  |  ${this.squares[8]}  | ${this.squares[9]}`)
    console.log('     |     |');
  } 
  
  displayWithClear() {
    console.clear();
    console.log('\n');
    this.display();
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }
  
  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }
  
  unusedSquares() {
    return Object.keys(this.squares)
      .filter(square => this.isUnusedSquare(square));
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, row) {
    return row.reduce((total, key) => {
      if (this.squares[key].getMarker() === player.getMarker()) {
        return total + 1;
      } else {
        return total;
      }
    }, 0);
  }
}

/*
- display welcome message
- repeat until the game is over:
  - display the current state of the board
  - let the first player make a move
  - is the game over? if so, exit the loop
  - let the second player make a move
  - is the game over? if so, exit the loop

- display the final state of the board.
- display the final result
- display a goodbye message
  

*/


class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7'],
  ]
  
  static joinOr(arr) {
    if (arr.length === 1) return arr[0];
  
    let result = arr.slice(0, -1).join(', ');
    result += ', or ' + String(arr[arr.length - 1]);
    return result;
  }
  
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    this.displayWelcomeMessage();
    
    let currentPlayer = this.human;

    this.board.reset();
    this.board.display();

    while (true) {
      this.playerMoves(currentPlayer);
      if (this.gameOver()) break;

      this.board.displayWithClear();
      currentPlayer = this.togglePlayer(currentPlayer);
    }
    
    this.board.displayWithClear();
    this.displayResults();
    this.displayGoodBye();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic Tac Toe!');
    console.log();
  }

  displayGoodBye() {
    console.log('Thank you for playing!')
  }
  
  playerMoves(currentPlayer) {
    if (currentPlayer === this.human) {
      this.humanMoves();
    } else {
      this.computerMoves();
    }
  }
  
  humanMoves() {
    let choice;
    
    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGame.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;
      
      console.log("That's not a valid choice");
      console.log();
    }
    
    this.board.markSquareAt(choice, this.human.getMarker());
  }
  
  determineWinningMove(player) {
    for (let row of TTTGame.POSSIBLE_WINNING_ROWS) {
      if (this.board.countMarkersFor(player, row) === 2) {
        for (let key of row) {
          if (this.board.isUnusedSquare(key)) {
            return key; 
          }
        }
      }
    }
    return null;  
  }

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;

    choice = this.determineWinningMove(this.computer);
    if (!choice) {
      choice = this.determineWinningMove(this.human);      
    }
    if (!choice && validChoices.includes('5')) {
      choice = '5';
    }
        
    if (!choice) {
      do {
        choice = Math.floor((9 * Math.random()) + 1).toString();
      } while(!validChoices.includes(choice));
    }
    
    this.board.markSquareAt(choice, this.computer.getMarker());
  }
  
  togglePlayer(currentPlayer) {
    return currentPlayer === this.human ? this.computer : this.human;
  }
  
  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }
  
  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log('You won!');
    } else if (this.isWinner(this.computer)) {
      console.log('The computer won!')
    } else {
      console.log('The board is full and nobody won!');
    }
  } 
}

let game = new TTTGame();
game.play();
