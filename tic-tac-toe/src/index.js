const getEnemyNumber = (playerNum) => {
  if (playerNum === 0) {
    return '1'
  }

  return '0'
}

const getEnemyAreas = (board, enemyNum) => {
  const boardState = {
    enemyAreas: 0,
  }

  board.forEach((row) => {
    const enemyAreas = row.filter((item) => item === enemyNum)
    boardState.enemyAreas += enemyAreas.length
  })

  return boardState.enemyAreas
}

const checkEnemyRows = (board, enemyNumber) => {
  board.forEach((row, index) => {
    const enemyAreas = row.filter((item) => item === enemyNumber)

    if (enemyAreas.length === 2) {
      const col = row.findIndex((item) => item === null)

      return [index, col]
    }
  })
}

const checkEnemyCols = (board, enemyNumber) => {
  const invertedBoard = []

  for (let col = 0, len = 3; col < len; col++) {
    const arr = []
    arr.push(board[0][col])
    arr.push(board[1][col])
    arr.push(board[2][col])

    invertedBoard.push(arr)
  }

  invertedBoard.forEach((cols, index) => {
    const enemyAreas = cols.filter((item) => item === enemyNumber)

    if (enemyAreas.length === 2) {
      const invertedRow = cols.findIndex((item) => item === null)

      return [invertedRow, index]
    }
  })
}

// This is sample player code to get you started!
// Players are STATELESS! See Player documentation for details.
module.exports = {
  // This gets called when it's your turn.
  onTurn: function (turnRequest) {
    // The state of the game with which you will decide your move
    const gameState = turnRequest.gameState
    const board = gameState.board
    const myPlayerNumber = gameState.player
    const enemyNummber = getEnemyNumber(myPlayerNumber)
    const enemyAreas = getEnemyAreas(board, getEnemyNumber(myPlayerNumber))

    checkEnemyRows(board, enemyNummber)
    checkEnemyCols(board, enemyNummber)

    if (enemyAreas < 2) {
      if (board[1][1] === null) {
        return [1, 1]
      }

      if (board[0][0] === null) {
        return [0, 0]
      }

      if (board[0][2] === null) {
        return [0, 2]
      }

      if (board[2][0] === null) {
        return [2, 0]
      }

      if (board[2][2] === null) {
        return [2, 2]
      }
    }

    if (enemyAreas === 2) {
      if (board[0][0] === null) {
        return [0, 0]
      }

      if (board[0][2] === null) {
        return [0, 2]
      }

      if (board[2][0] === null) {
        return [2, 0]
      }

      if (board[2][2] === null) {
        return [2, 2]
      }
    }

    // Your player must return a move with the format [row,col]
    let row, col

    // This is an example of making a random move to an empty square.
    // You need to write code that is smarter than this!
    do {
      row = Math.floor(Math.random() * 3)
      col = Math.floor(Math.random() * 3)
    } while (board[row][col] != null)

    // Return your move
    return [row, col]
  },
}
