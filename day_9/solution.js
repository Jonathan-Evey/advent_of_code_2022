const fs = require("fs");

fs.readFile("testInput.txt", "utf8", (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  let array = data.split("\n");
  console.log(array);
  formatMoves(array);
  runMoves(moves);
});

let bridgeMap = [];
let moves = [];

const moveDirectionsKeys = {
  up: "U",
  down: "D",
  left: "L",
  right: "R",
};

const formatMoves = (array) => {
  array.map((each) => {
    each = each.split(" ");
    moves.push({
      direction: each[0],
      distance: each[1],
    });
  });
  console.log(moves);
};

const positionObj = (rowValue, columnValue) => {
  let eachMove = [];
  const move = (direction, distance) => {
    switch (direction) {
      case moveDirectionsKeys.up:
        position.row += distance;
        break;
      case moveDirectionsKeys.down:
        position.row -= distance;
        break;
      case moveDirectionsKeys.left:
        position.column -= distance;
        break;
      case moveDirectionsKeys.right:
        position.column += distance;
        break;
    }
    eachMove.unshift([position.row, position.column]);
  };

  const position = {
    moves: eachMove,
    row: rowValue,
    column: columnValue,

    move,
  };

  return {
    position,
  };
};

const runMoves = (objArray) => {
  let bridgeHeight;
  let bridgeWidth;
  let headPosition = positionObj(0, 0);
  let tailPosition = positionObj(0, 0);
  objArray.forEach((element, index) => {
    const isUp = element.direction === moveDirectionsKeys.up;
    const isDown = element.direction === moveDirectionsKeys.down;
    const isRight = element.direction === moveDirectionsKeys.right;
    const isLeft = element.direction === moveDirectionsKeys.left;

    if (index === 0) {
      //starting ponit
      bridgeMap.push(headPosition);
    }
    if (isUp || isDown) {
      let currentHeight = bridgeMap.length;
      for (let i = 0; i < element.distance - currentHeight; i++) {
        if (isUp) {
          headPosition.position.move();
          bridgeMap.unshift(Array(bridgeWidth).fill("_"));
        }
        if (isDown) {
          bridgeMap.push(Array(bridgeWidth).fill("_"));
        }
      }

      console.log(bridgeMap);
      console.log(currentHeight);
    }
    if (isLeft || isRight) {
    }
    headPosition.position.move(element.direction, Number(element.distance));
    console.log(headPosition.position.moves);
    console.log(bridgeMap);
  });
};
