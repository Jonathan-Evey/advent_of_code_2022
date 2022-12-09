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
  let columeStart = 0;
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
        if (treeIndex === columeStart) {
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

const isNotSeen = (value, rowIndex, columeIndex) => {
  return (
    checkRows(value, rowIndex, columeIndex) &&
    checkColumes(value, rowIndex, columeIndex)
  );
};

const checkRows = (value, rowIndex, columeIndex) => {
  let leftSideNotSeen = false;
  let rightSideNotSeen = false;
  for (let i = 0; i < columeIndex; i++) {
    if (forestGrid.fullGrid[rowIndex][i] >= value) {
      leftSideNotSeen = true;
    }
  }
  for (let i = forestGrid.fullGrid[rowIndex].length - 1; i > columeIndex; i--) {
    if (forestGrid.fullGrid[rowIndex][i] >= value) {
      rightSideNotSeen = true;
    }
  }
  return rightSideNotSeen && leftSideNotSeen;
};

const checkColumes = (value, rowIndex, columeIndex) => {
  let topNotSeen = false;
  let bottomNotSeen = false;
  for (let i = 0; i < rowIndex; i++) {
    if (forestGrid.fullGrid[i][columeIndex] >= value) {
      topNotSeen = true;
    }
  }
  for (let i = forestGrid.fullGrid.length - 1; i > rowIndex; i--) {
    if (forestGrid.fullGrid[i][columeIndex] >= value) {
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
