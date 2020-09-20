import {OBJECT_TYPE, DIRECTIONS} from './setup';

class Pacman {
  constructor(speed, startPos) {
    this.pos = startPos;
    this.speed = speed;
    this.dir = null;
    this.timer = 0;
    this.powerPill = false;
    this.rotation = true;
  }

  shouldMove() {
    if(!this.dir) return false;

    if(this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    this.timer++;
  }

  getNextMove(objectExist) {
    let nextMovePos = this.pos + this.dir.movement;

    if (objectExist(nextMovePos, OBJECT_TYPE.WALL) || objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR) ) {
      nextMovePos = this.pos;
    }

    return{nextMovePos, direction: this.dir};
  }

  makeMove() {
    const classesToRemove = [OBJECT_TYPE.PACMAN];
    const classToAdd = [OBJECT_TYPE.PACMAN];
    return {classesToRemove, classToAdd};
  }

  setNewPos(nextMovePos) {
    this.pos = nextMovePos;
  }

  handlekeyInput(e, objectExist) {
    let dir;

    // left, up, right, down
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      dir = DIRECTIONS[e.key]
    } else {
      return;
    }

    const nextMovePos = this.pos + dir.movement;
    if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) return;
    this.dir = dir;
  }
}

export default Pacman;

