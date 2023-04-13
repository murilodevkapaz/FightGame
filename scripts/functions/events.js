function dispatchKeyEvents(e, character) {
  e.preventDefault();
  switch (e.key) {
    case ARROW_UP: {
      if (character.jumpNumber < 1) {
        character.isColliding = false;
        character.gravity = -30;
        character.posY -= 1;
        character.jumpNumber++;
      }
      break;
    }
    case ARROW_RIGHT: {
      character.moveRight = true;
      character.moveLeft = false;
      break;
    }
    case ARROW_LEFT: {
      character.moveRight = false;
      character.moveLeft = true;
      break;
    }
  }
}

function removeKeyEvents(e, character) {
  e.preventDefault();
  switch (e.key) {
    case ARROW_RIGHT: {
      character.moveRight = false;
      break;
    }
    case ARROW_LEFT: {
      character.moveLeft = false;
      break;
    }
  }
}
