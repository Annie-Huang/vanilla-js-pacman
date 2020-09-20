import {DIRECTIONS, OBJECT_TYPE} from './setup';

class Ghost {
  constructor(speed = 5, startPos, movement, name) {
    this.name = name;
    this.movement = movement;
    this.startPos = startPos;
    this.pos = startPos;
    this.dir = DIRECTIONS.ArrowRight;
    this.speed = speed;
    this.timer = 0;
    this.isScared = false;
    this.rotation = false;
  }

  // Both Pacman and Ghost have this method.
  shouldMove() {
    if(this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    this.timer++;
    return false;
  }

}
