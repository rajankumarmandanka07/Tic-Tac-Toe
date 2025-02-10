// interfaces.js

export class IBattlefield {
    create() {}
    reset() {}
  }
  
  export class IGameLogic {
    playerMove(event) {}
    handleNextTurn() {}
    endGame() {}
    restartGame() {}
  }
  
  export class IUIHandler {
    updateInstruction(text) {}
    showResults(totalHits, totalMisses) {}
    disableBoard() {}
  }
  