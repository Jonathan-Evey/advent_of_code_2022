const fs = require("fs");

fs.readFile("input.txt", "utf8", (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  let array = data.split("\n").map((e) => e.trim());
  console.log(array);
  findDir(array);
});

const keys = {
  cd: "$ cd",
  cdHome: "$ cd /", // goes to top level (home)
  cdOutOne: "$ cd ..", //up one level
  ls: "$ ls", //show all files and dir in dir
  dir: "dir", //followed by name of another dir
  file: "", // number (file size), file name, EX - 584 i = (file named i, size of 584)
};

let dirTree = {
  home: {
    files: [],
  },
};
let fileNamesArray = [];
let filePathArray = [];
let currentDirPath;
let afterLs = false;
const findDir = (array) => {
  array.forEach((element) => {
    if (element.includes(keys.cd)) {
      afterLs = false;
      if (element === keys.cdHome) {
        fileNamesArray = ["home"];
        filePathArray = ["home"];
      } else if (element === keys.cdOutOne) {
        fileNamesArray.pop();
        filePathArray.pop();
      } else {
        let dirName = element.split(" ");
        currentDirPath = fileNamesArray.join("/") + "/" + dirName[2];
        filePathArray.push(currentDirPath);
        fileNamesArray.push(dirName[2]);
      }
    }
    if (afterLs) {
      if (element.includes(keys.dir)) {
        let dirName = element.split(" ");
        dirName = dirName[1];
        dirName = fileNamesArray.join("/") + "/" + dirName;
        dirName = dirName.replace(/['"]+/g, "");
        dirTree = {
          ...dirTree,
          [dirName]: {
            files: [],
          },
        };
      } else {
        let splitFileInfo = element.split(" ");
        let currentKnowDir = Object.keys(dirTree);
        currentKnowDir.forEach((dir) => {
          if (filePathArray.includes(dir)) {
            dirTree[dir].files.push({
              fileName: splitFileInfo[1],
              size: splitFileInfo[0],
            });
          }
        });
        // if (!currentFiles.includes(splitFileInfo[1])) {
        //   dirTree[filePath[filePath.length - 1]].files.push({
        //     fileName: splitFileInfo[1],
        //     size: splitFileInfo[0],
        //   });
        // }
      }
    }
    if (element === keys.ls) {
      afterLs = true;
    }
  });
  calculateDirSizes();
};

const calculateDirSizes = () => {
  let allDirFileSizes = [];
  let allDirKeys = Object.keys(dirTree);
  allDirKeys.map((eachKey) => {
    let dirSizeTotal = 0;
    dirSizeTotal = calculateFileSizes(dirTree[eachKey]);

    allDirFileSizes.push({
      dirName: [eachKey],
      sizeTotal: [dirSizeTotal],
    });
  });
  getFinalNumber(allDirFileSizes);
  calculateWhatToDelete(allDirFileSizes);
};

const calculateFileSizes = (currentDir) => {
  let sizeOfAllFiles = 0;

  currentDir.files.forEach((file) => {
    sizeOfAllFiles = sizeOfAllFiles + Number(file.size);
  });
  return sizeOfAllFiles;
};

const getFinalNumber = (array) => {
  let total = 0;
  let eachDir = [];
  array.forEach((each) => {
    if (Number(each.sizeTotal) <= 100000) {
      total = total + Number(each.sizeTotal);
      eachDir.push(each);
    }
  });
  console.log(total);
};

//// part Two ////////
let partTwoKeys = {
  totalSpace: 70000000,
  spaceNeeded: 30000000,
};

const calculateWhatToDelete = (arrayOfObj) => {
  let homeDir = arrayOfObj.filter((each) => {
    if (each.dirName[0] === "home") {
      return each;
    }
  });
  let freeSpace = partTwoKeys.totalSpace - homeDir[0].sizeTotal[0];
  let spaceStillNeeded = partTwoKeys.spaceNeeded - freeSpace;
  findDirToDelete(arrayOfObj, spaceStillNeeded);
};

const findDirToDelete = (array, number) => {
  let total = 0;
  let eachDir = [];
  array.forEach((each) => {
    if (Number(each.sizeTotal) >= number) {
      total = total + Number(each.sizeTotal);
      eachDir.push(each);
    }
  });
  eachDir.sort(function (a, b) {
    return a.sizeTotal - b.sizeTotal;
  });
  console.log(eachDir[0]);
};
