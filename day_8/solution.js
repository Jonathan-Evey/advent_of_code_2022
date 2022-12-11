const fs = require("fs");

fs.readFile("input.txt", "utf8", (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  let array = data.split("\n");
  //console.log(array);
  formateData(array);
  findTreesThatAreSeen();
  countTreesSeen();
  findScenicScore();
});

let forestGrid = {
  fullGrid: [],
  treesSeen: [],
};

const formateData = (array) => {
  array.forEach((line, index) => {
    forestGrid.fullGrid.push(line.split(""));
  });
  //console.log(forestGrid);
};

const findTreesThatAreSeen = () => {
  let rowStart = 0;
  let currentRow = 0;
  let columnStart = 0;
  forestGrid.fullGrid.forEach((row, rowIndex) => {
    if (rowIndex === rowStart) {
      forestGrid.treesSeen.push(row);
      return;
    }
    if (rowIndex === forestGrid.fullGrid.length - 1) {
      forestGrid.treesSeen.push(row);
      return;
    }
    if (rowIndex > rowStart) {
      row.forEach((tree, treeIndex) => {
        if (treeIndex === columnStart) {
          forestGrid.treesSeen.push([tree]);
          return;
        }
        isNotSeen(Number(tree), rowIndex, treeIndex)
          ? forestGrid.treesSeen[rowIndex].push("*")
          : forestGrid.treesSeen[rowIndex].push(tree);
      });
    }
    currentRow += 1;
  });
  //console.log(forestGrid);
};

const isNotSeen = (value, rowIndex, columnIndex) => {
  return (
    checkRows(value, rowIndex, columnIndex) &&
    checkColumns(value, rowIndex, columnIndex)
  );
};

const checkRows = (value, rowIndex, columnIndex) => {
  let leftSideNotSeen = false;
  let rightSideNotSeen = false;
  for (let i = 0; i < columnIndex; i++) {
    if (forestGrid.fullGrid[rowIndex][i] >= value) {
      leftSideNotSeen = true;
    }
  }
  for (let i = forestGrid.fullGrid[rowIndex].length - 1; i > columnIndex; i--) {
    if (forestGrid.fullGrid[rowIndex][i] >= value) {
      rightSideNotSeen = true;
    }
  }
  return rightSideNotSeen && leftSideNotSeen;
};

const checkColumns = (value, rowIndex, columnIndex) => {
  let topNotSeen = false;
  let bottomNotSeen = false;
  for (let i = 0; i < rowIndex; i++) {
    if (forestGrid.fullGrid[i][columnIndex] >= value) {
      topNotSeen = true;
    }
  }
  for (let i = forestGrid.fullGrid.length - 1; i > rowIndex; i--) {
    if (forestGrid.fullGrid[i][columnIndex] >= value) {
      bottomNotSeen = true;
    }
  }
  return topNotSeen && bottomNotSeen;
};

const countTreesSeen = () => {
  let treeCount = 0;
  forestGrid.treesSeen.forEach((row) => {
    row.forEach((tree) => {
      if (tree !== "*") {
        treeCount += 1;
      }
    });
  });
  console.log(treeCount);
};

const findScenicScore = () => {
  let scoresArray = [];
  forestGrid.fullGrid.forEach((row, rowIndex) => {
    if (rowIndex !== 0 && rowIndex !== forestGrid.fullGrid.length - 1) {
      row.forEach((tree, columnIndex) => {
        if (columnIndex !== 0 && columnIndex !== row.length - 1) {
          let treeValue = Number(forestGrid.fullGrid[rowIndex][columnIndex]);
          let topScore = findTopValue(treeValue, rowIndex, columnIndex);
          let bottomScore = findBottomValue(treeValue, rowIndex, columnIndex);
          let rightScore = findRightValue(treeValue, rowIndex, columnIndex);
          let leftScore = findLeftValue(treeValue, rowIndex, columnIndex);
          scoresArray.push(topScore * bottomScore * leftScore * rightScore);
        }
      });
    }
  });
  console.log(Math.max(...scoresArray));
};

const findTopValue = (treeValue, treeRowIndex, treeColumnIndex) => {
  let topValue = 0;
  let currentRowIndex = treeRowIndex;
  let currentTree = treeValue;

  while (currentRowIndex > 0) {
    topValue = topValue + 1;
    if (
      currentTree <= forestGrid.fullGrid[currentRowIndex - 1][treeColumnIndex]
    ) {
      break;
    }
    currentRowIndex = currentRowIndex - 1;
  }
  return topValue;
};

const findBottomValue = (treeValue, treeRowIndex, treeColumnIndex) => {
  let bottomValue = 0;
  let currentRowIndex = treeRowIndex;
  let currentTree = treeValue;

  while (currentRowIndex < forestGrid.fullGrid.length - 1) {
    bottomValue = bottomValue + 1;
    if (
      currentTree <= forestGrid.fullGrid[currentRowIndex + 1][treeColumnIndex]
    ) {
      break;
    }
    currentRowIndex = currentRowIndex + 1;
  }
  return bottomValue;
};

const findRightValue = (treeValue, treeRowIndex, treeColumnIndex) => {
  let rightValue = 0;
  let currentColumnIndex = treeColumnIndex;
  let currentTree = treeValue;
  while (currentColumnIndex < forestGrid.fullGrid[treeRowIndex].length - 1) {
    rightValue = rightValue + 1;
    if (
      currentTree <= forestGrid.fullGrid[treeRowIndex][currentColumnIndex + 1]
    ) {
      break;
    }
    currentColumnIndex = currentColumnIndex + 1;
  }
  return rightValue;
};

const findLeftValue = (treeValue, treeRowIndex, treeColumnIndex) => {
  let leftValue = 0;
  let currentColumnIndex = treeColumnIndex;
  let currentTree = treeValue;
  while (currentColumnIndex > 0) {
    leftValue = leftValue + 1;
    if (
      currentTree <= forestGrid.fullGrid[treeRowIndex][currentColumnIndex - 1]
    ) {
      break;
    }
    currentColumnIndex = currentColumnIndex - 1;
  }
  return leftValue;
};
