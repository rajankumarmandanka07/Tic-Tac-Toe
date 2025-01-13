class Battlefield {
  constructor(size, containerId) {
    this.size = size;
    this.totalShips = size * size;
    this.battlefieldElement = document.getElementById(containerId);
    this.ships = [];
  }

  create() {
    for (let i = 0; i < this.totalShips; i++) {
      const ship = document.createElement("div");
      ship.classList.add("ship");
      ship.dataset.index = i;
      this.battlefieldElement.appendChild(ship);
      this.ships.push(ship);
    }
  }

  reset() {
    this.battlefieldElement.innerHTML = "";
    this.ships = [];
    this.create();
  }
}

