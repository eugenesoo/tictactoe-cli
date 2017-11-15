const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '(>^.^)> ',
});

let game;
let player1Name;
let player2Name;

console.log(`
  welcome to
  TIC TAC TOE
`);

console.log(`please type start to start a new game, or exit to exit.`);
rl.prompt();

rl.on('line', (input) => {
  switch (input) {
    case 'exit':
      rl.close();
      break;
    case 'start':
      if (game) {
        console.log('a game has already been started! please exit the game or complete the current game.');
        rl.prompt();
        break;
      }
      rl.question('what is your name?\n',(input) => {
        player1Name = input;
        rl.question('what is your friend name?\n', (input) => {
          player2Name = input;
          game = new TicTacToe(player1Name, player2Name);
          rl.prompt();
        })
      });
      rl.prompt();
      break;
    case 'move':
      if (!game) {
        console.log('a game has not been started yet. please start a game by typing start.');
        rl.prompt();
        break;
      }

      rl.question(`what row would you like to place your piece, ${game.players[game.currentPlayerIndex]}?`, (input) => {
        const rowIndex = input;
        rl.question(`what column?`, (input) => {
          const colIndex = input;
          game.makeMove(rowIndex, colIndex);
          rl.prompt();
        });
      });
      rl.prompt();
      break;
    default:
      console.log('NANI? type help to see available commands.');
      rl.prompt();
      break;
  }
});

const createBoard = function () {
  return [['', '', ''], ['', '', ''], ['', '', '']];
}

class TicTacToe {
  constructor(player1Name, player2Name) {
    this.players = [player1Name, player2Name];
    this.currentPlayerIndex = 0;
    this.board = createBoard();
    console.log('the ultimate tic tac toe game will now start.');
    console.log(`${this.players[this.currentPlayerIndex]} will start first.`);
    console.log(`type move to make a move.`)
    console.log(this.drawBoard());
  }

  drawBoard() {
    let board = '';
    for (let i = 0; i < this.board.length; i += 1) {
      board += ` ${this.board[i][0]} | ${this.board[i][1]} | ${this.board[i][2]} `; 
      board += '\n';
      if (i !== this.board.length - 1) {
        board += '---------';
        board += '\n';
      }
    }
    return board;
  }

  //function to make move
  makeMove(rowIndex, colIndex) {
    console.log(`current board`);
    console.log(this.drawBoard());
    console.log(`it is now ${this.players[this.currentPlayerIndex]}'s turn.`)
    let moveType;
    if (this.currentPlayerIndex) {
      moveType = 'o';
    } else {
      moveType = 'x';
    }

    if (this.board[rowIndex][colIndex]) {
      console.log('invalid move - piece already exists');
    } else {
      this.board[rowIndex][colIndex] = moveType;
      if (this.checkWin()) {
        console.log('WE HAVE A WINNER');
        console.log(this.drawBoard());
        game = undefined;
        return;
      };
      this.changePlayer();
      console.log('current board');
      console.log(this.drawBoard());
      console.log(`next player: ${this.players[this.currentPlayerIndex]}`);
    }
  }
  //function to detect same row
  checkRowWin(rowIndex) {
    return (this.board[rowIndex][0] === 'o' && this.board[rowIndex][1] === 'o' && this.board[rowIndex][2] === 'o' ||
      this.board[rowIndex][0] === 'x' && this.board[rowIndex][1] === 'x' && this.board[rowIndex][2] === 'x')
  }
  //function to detect same column
  checkColWin(colIndex) {
    return (this.board[0][colIndex] === 'o' && this.board[1][colIndex] === 'o' && this.board[2][colIndex] === 'o' ||
      this.board[0][colIndex] === 'x' && this.board[1][colIndex] === 'x' && this.board[2][colIndex] === 'x')
  }
  //function to detect horizontal
  checkDiagRightWin() {
    return (this.board[0][0] === 'o' && this.board[1][1] === 'o' && this.board[2][2] === 'o' ||
      this.board[0][0] === 'x' && this.board[1][1] === 'x' && this.board[2][2] === 'x')
  }
  
  checkDiagLeftWin() {
    return (this.board[0][2] === 'o' && this.board[1][1] === 'o' && this.board[2][0] === 'o' ||
      this.board[0][2] === 'x' && this.board[1][1] === 'x' && this.board[2][0] === 'x')
  }
  
  checkWin() {
    for (let i = 0; i <= 2; i += 1) {
      if (this.checkRowWin(i) || this.checkColWin(i)) {
        return true;
      }
    }
    if (this.checkDiagRightWin() || this.checkDiagLeftWin()) {
      return true;
    }
    return false;
  }
  //function to change current player
  changePlayer() {
    if (!this.currentPlayerIndex) {
      this.currentPlayerIndex += 1;
    } else {
      this.currentPlayerIndex = 0;
    }
  }
}
