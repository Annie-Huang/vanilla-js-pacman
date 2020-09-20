import {GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST} from './setup';

class GameBoard {
  constructor(DOMGrid) {
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid = DOMGrid;
  }

  showGameStatus(gameWin) {
    const div = document.createElement('div');
    div.classList.add('game-status');
    div.innerHTML = `${gameWin ? 'WIN!' : 'GAME OVER!'}`;
    this.DOMGrid.appendChild(div);
  }

  createGrid(level) {
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid.innerHTML = '';
    this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);`;

    level.forEach(square => {
      const div = document.createElement('div');

      // Add multiple class.
      // e.g. when square=20, CLASS_LIST[Leve[20]]= CLASS_LIST[1] = OBJECT_TYPE.WALL = 'wall'. so it becomes
      // div.classList.add('square', 'wall');
      div.classList.add('square', CLASS_LIST[square]);

      div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`;
      this.DOMGrid.appendChild(div);
      this.grid.push(div);

      if(CLASS_LIST[square] === OBJECT_TYPE.DOT) this.dotCount++;
    })
  }

  addObject(pos, classes) {
    this.grid[pos].classList.add(...classes)
  }

  removeObject(pos, classes) {
    this.grid[pos].classList.remove(...classes)
  }

  objectExist = (pos, object) => {
    return this.grid[pos].classList.contains(object);
  }

  rotateDiv(pos, deg) {
    this.grid[pos].style.transform = `rotate(${deg}deg)`;
  }

  // Use for both the pacman and the ghost
  moveCharacter(character) {
    if (character.shouldMove()) {
      // const {nextMovePos, direction} = character.getNextMove(this.objectExist.bind(this));
      const {nextMovePos, direction} = character.getNextMove(this.objectExist);
      const {classesToRemove, classesToAdd} = character.makeMove();

      if(character.rotation && nextMovePos !== character.pos) {
        this.rotateDiv(nextMovePos, character.dir.rotation);
        this.rotateDiv(character.pos, 0); // reset the pacman in the current position in case we land on this position again.
      }

      this.removeObject(character.pos, classesToRemove);
      this.addObject(nextMovePos, classesToAdd);

      character.setNewPos(nextMovePos, direction);
    }
  }

  static createGameBoard(DOMGrid, level) {
    const board = new this(DOMGrid);
    board.createGrid(level);
    return board;
  }
}

export default GameBoard;
