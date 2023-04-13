class Sprite {
  // attributes
  gravity = 0;
  jumpNumber = 0;
  moveRight = false;
  moveDown = false;
  isColliding = false;
  action = "stopped";

  numberOfSprites = 6;
  spriteIndex = 0;

  /**
   * constructor
   * @param {number} posX
   * @param {number} posY
   * @param {number} width
   * @param {Image} image
   * @param {number} height
   * @param {boolean} isColliding
   *
   */
  constructor({
    posX,
    posY,
    width,
    height,
    image,
    spriteInitX = 100,
    spriteInitY = 100,
    spriteWidth = 100,
    spriteHeight = 100,
  }) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.spriteInitX = spriteInitX;
    this.spriteInitY = spriteInitY;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.image = image;
  }

  animateSpriteWhenStopped() {
    this.spriteInitX = this.spriteWidth * Math.floor(this.spriteIndex);

    if (
      this.spriteInitX >=
      (this.image.width / this.numberOfSprites) * (this.numberOfSprites - 1)
    ) {
      this.spriteIndex = 0;
    } else this.spriteIndex += 0.1;
    return true;
  }

  animateSprite() {
    // when is stopped
    /* if (this.isColliding) */ this.animateSpriteWhenStopped();
    // when walking
    // else if (this.moveRight) this.animateSpriteWhenWalking();
  }

  checkCollision(collisionsRect) {
    let colliderPosY;
    collisionsRect.forEach((lines) => {
      lines.forEach((collider) => {
        const hasCollision = checkCollisionDown(this, collider);
        if (hasCollision) {
          colliderPosY = collider.posY;
          this.isColliding = true;
          this.jumpNumber = 0;
        }
      });
    });
    return colliderPosY;
  }

  handleJump(colliderPosY) {
    ++this.gravity;
    this.posY += this.gravity;

    if (colliderPosY && this.gravity >= 0) {
      const diff = this.posY + this.height - colliderPosY;
      this.posY -= diff;
      this.gravity = 0;
    }
  }

  /**
   * does character movement
   */
  movement(collisionsRect) {
    const colliderPosY = this.checkCollision(collisionsRect);

    this.handleJump(colliderPosY);

    if (this.moveRight) {
      this.posX += 10;
    }
    if (this.moveLeft) {
      this.posX -= 10;
    }

    this.animateSprite();
  }

  /**
   * draw rect
   */
  draw() {
    // cx.fillStyle = "green";
    // cx.fillRect(posX, posY, width, height);
    cx.drawImage(
      this.image,
      this.spriteInitX,
      this.spriteInitY,
      this.spriteWidth,
      this.spriteHeight,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }
}
