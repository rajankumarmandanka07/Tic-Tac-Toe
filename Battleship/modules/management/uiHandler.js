import { IUIHandler } from "../controller/interfaces.js";

class UIHandler extends IUIHandler {
    constructor(instructionId, resultsId) {
        super();
        this.instructionElement = document.getElementById(instructionId);
        this.resultsElement = document.getElementById(resultsId);
    }

    updateInstruction(text) {
        this.instructionElement.textContent = text;
    }

    showResults(totalHits, totalMisses) {
        this.resultsElement.style.display = "block";
        this.resultsElement.innerHTML = `
      <h2>Results:</h2>
      <p>Total Hits: ${totalHits}</p>
      <p>Total Misses: ${totalMisses}</p>
      <button id="restart-btn" class="btn btn-success btn-lg mt-3">Restart</button>
    `;
    }

    disableBoard() {
        document.querySelectorAll(".ship").forEach(ship => {
            ship.style.pointerEvents = "none";
        });
    }
}

export { UIHandler };