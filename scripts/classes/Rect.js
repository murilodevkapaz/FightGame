class Rect {
    /**
     * constructor
     * @param {number} posX
     * @param {number} posY
     * @param {number} width
     * @param {number} height
     * @param {string} color
     */
    constructor(posX, posY, width, height, color="red") {
      this.posX = posX;
      this.posY = posY;
      this.width = width;
      this.height = height;
      this.color = color;
    }
  
    /**
     * draw rect
     */
    draw() {
      const { posX, posY, width, height, color } = this;
      cx.fillStyle = color;
      cx.fillRect(posX, posY, width, height);
    }
  }