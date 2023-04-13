const canvas = document.querySelector("canvas");
const cx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = "grey";

// destructing
const { innerWidth, innerHeight } = window;

// create rect size according screen one
const BOX_WIDTH = innerWidth / 30;
const BOX_HEIGHT = innerHeight / 20;
// create map
const map = new Image();
map.src = "assets/scenarioGame.png";

let womanCharacter;

// load firs images
map.onload = () => {
  // draw map
  cx.drawImage(map, 0, 0, innerWidth, innerHeight);
};

// draw woman warrior
const warriorWoman = new Image();

warriorWoman.src = "assets/characters/woman/Warrior_Sheet-Effect.png";

warriorWoman.onload = () => {
  // create character
  womanCharacter = new Sprite({
    // src
    image: warriorWoman,
    // image sizes
    spriteInitX: 0,
    spriteInitY: 0,
    spriteWidth: warriorWoman.width / 6,
    spriteHeight: 42,
    // canvas size
    posX: 100,
    posY: 100,
    width: 150,
    height: 150,
  });
};

// create colliders
const collisionsArray = createCollisionsArray(collisions);
const collisionsRect = createCollisionsRect({
  collisionsArray,
  boxWidth: BOX_WIDTH,
  boxHeight: BOX_HEIGHT,
});

// dispatch events
document.onkeydown = (e) => dispatchKeyEvents(e, womanCharacter);
document.onkeyup = (e) => removeKeyEvents(e, womanCharacter);

// draw canvas
/**
 * draw canvas every time
 */
function _draw() {
  window.requestAnimationFrame(_draw);
  // clear canvas
  cx.clearRect(0, 0, innerWidth, innerHeight);

  cx.drawImage(map, 0, 0, innerWidth, innerHeight);
  womanCharacter.movement(collisionsRect);
  womanCharacter.draw();
}

_draw();