/**
 *
 * @param {number[]} collisions
 * @returns {number[][]}
 */
function createCollisionsArray(collisions) {
  const { collisions: collisionsArray } = collisions.reduce(
    (acc, obj) => {
      acc.collisionsLine.push(obj);
      ++acc.line;

      if (acc.line === 30) {
        acc.collisions.push(acc.collisionsLine);
        acc.collisionsLine = [];
        acc.line = 0;
      }
      return acc;
    },
    { collisions: [], line: 0, collisionsLine: [] }
  );

  return collisionsArray;
}

/**
 * create an array of colliders
 *
 * @param {number[][]} collisionsArray collisionsArray
 * @param {number} boxWidth collisionsArray
 * @param {number} boxHeight collisionsArray
 * @returns {Rect[]} return the array of colliders
 */
function createCollisionsRect({
  collisionsArray,
  boxWidth = 12,
  boxHeight = 12,
}) {
  let posY = 0;

  const { collisions } = collisionsArray.reduce(
    (acc, row) => {
      const { rects } = row.reduce(
        (acc, obj) => {
          if (obj != 0) {
            const rect = new Rect(acc.posX, acc.posY, boxWidth, boxHeight);
            acc.rects.push(rect);
          }
          acc.posX += BOX_WIDTH;
          return acc;
        },
        { rects: [], posX: 0, posY }
      );

      posY += boxHeight;
      rects.length && acc.collisions.push(rects);
      return acc;
    },
    { collisions: [], posY }
  );

  return collisions;
}

/**
 *
 * @param {*} box1
 * @param {*} box2
 * @returns
 */
function checkCollisionDown(box1, box2) {
  // const hasCollision = Math.floor(box1.posY) >= Math.floor(box2.posY);
  // hasCollision && console.log("box1 posY: ", box1.posY, ", box posY: ", box2.posY, "hasCollision", hasCollision);7
  const hasCollision =
    box1.posX + box1.width >= box2.posX &&
    box1.posX <= box2.posX + box2.width &&
    box1.posY + box1.height >= box2.posY &&
    box1.posY <= box2.posY;
  return hasCollision;
}
