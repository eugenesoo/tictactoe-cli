const createBoard = function () {
  return [['', '', ''], ['', '', ''], ['', '', '']];
}

class TicTacToe {
  constructor(player1Name, player2Name) {
    this.players = [player1Name, player2Name];
    this.currentPlayerIndex = 0;
    this.board = createBoard();
  }

  //function to make move
  makeMove(rowIndex, colIndex) {
    console.log(`it is now ${this.players[this.currentPlayerIndex]}'s turn.'`)
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
      };
      this.changePlayer();
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
      this.board[0][colIndex] === 'x' && this.board[0][colIndex] === 'x' && this.board[0][colIndex] === 'x')
  }
  //function to detect horizontal
  checkDiagRightWin() {
    return (this.board[0][0] === 'o' && this.board[1][1] === 'o' && this.board[2][2] === 'o' ||
      this.board[0][0] === 'x' && this.board[1][1] === 'x' && this.board[1][1] === 'x')
  }
  
  checkDiagLeftWin() {
    return (this.board[0][2] === 'o' && this.board[1][1] === 'o' && this.board[2][0] === 'o' ||
      this.board[0][2] === 'x' && this.board[1][1] === 'x' && this.board[2][0] === 'x')
  }
  
  checkWin() {
    for (let i = 0; i <= 2; i += 1) {
      if (checkRowWin(i) || checkColWin(i)) {
        return true;
      }
    }
    if (checkDiagRightWin() || checkDiagLeftWin()) {
      return true;
    }
    return false;
  }
  //function to change current player
  changePlayer() {
    if (this.currentPlayerIndex) {
      this.currentPlayerIndex += 1;
    } else {
      this.currentPlayerIndex = 0;
    }
    return this.currentPlayerIndex;
  }
}