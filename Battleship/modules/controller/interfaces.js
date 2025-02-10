class IBattlefield {
  create() { }
  reset() { }
}

class IGameLogic {
  playerMove(event) { }
  handleNextTurn() { }
  endGame() { }
  restartGame() { }
}

class IUIHandler {
  updateInstruction(text) { }
  showResults(totalHits, totalMisses) { }
  disableBoard() { }
}

export { IBattlefield, IGameLogic, IUIHandler };
