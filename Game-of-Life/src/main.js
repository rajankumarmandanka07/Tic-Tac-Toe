import { GameBoard } from './models/GameBoard.js';
import { GameNextGeneration } from './models/GameNextGeneration.js';
import { GameController } from './controllers/GameController.js';

const rows = 30;
const cols = 30;

const gameBoard = new GameBoard(rows, cols, 'grid');
const nextGenLogic = new GameNextGeneration(gameBoard);
const controller = new GameController(gameBoard, nextGenLogic);

document.getElementById('playBtn').addEventListener('click', () => controller.play());
document.getElementById('pauseBtn').addEventListener('click', () => controller.pause());
document.getElementById('resetBtn').addEventListener('click', () => controller.reset());
document.getElementById('randomBtn').addEventListener('click', () => controller.randomInput());