import { IBattlefield } from "./interfaces.js";

class Battlefield extends IBattlefield {
    constructor(size, containerId) {
        super();
        this.size = size;
        this.totalShips = size * size;
        this.battlefieldElement = document.getElementById(containerId);
        this.ships = [];
    }

    create() {
        this.battlefieldElement.innerHTML = "";
        for (let i = 0; i < this.totalShips; i++) {
            const ship = document.createElement("div");
            ship.classList.add("ship");
            ship.dataset.index = i;
            this.battlefieldElement.appendChild(ship);
            this.ships.push(ship);
        }
    }

    reset() {
        this.ships = [];
        this.create();
    }
}

export { Battlefield };