const fs = require('fs');

fs.readFile('input.txt', 'utf8', (error, data) => {
	if (error) {
		console.log(error);
		return;
	}
	let array = data.split('\n').map((e) => e.trim());
	console.log(array);
	findDir(array);
});

const keys = {
	cd: '$ cd',
	cdHome: '$ cd /', // goes to top level (home)
	cdOutOne: '$ cd ..', //up one level
	ls: '$ ls', //show all files and dir in dir
	dir: 'dir', //followed by name of another dir
	file: '', // number (file size), file name, EX - 584 i = (file named i, size of 584)
};

let dirTree = {
	home: {
		subDirs: [],
		files: [],
	},
};
let allDirName = [];
let filePath = ['home'];
let afterLs = false;
const findDir = (array) => {
	array.forEach((element) => {
		if (element.includes(keys.cd)) {
			console.log('//////cd path');
			console.log(filePath);
			let fileName = element.split(' ');
			afterLs = false;
			if (element === keys.cdHome) {
				filePath = ['home'];
			} else if (fileName[2] === '..') {
				filePath.pop();
			} else {
				filePath.push(fileName[2]);
			}
		}
		if (afterLs) {
			if (element.includes(keys.dir)) {
				let dirName = element.split(' ');

				dirTree = {
					...dirTree,
					[dirName[1]]: { subDirs: [], files: [] },
				};
				allDirName.push(dirName[1]);

				dirTree[filePath[filePath.length - 1]].subDirs.push(
					dirName[1]
				);
			} else {
				let splitFileInfo = element.split(' ');
				let currentFiles = [];
				dirTree[filePath[filePath.length - 1]].files.forEach(
					(file) => {
						currentFiles.push(file.fileName);
					}
				);
				if (!currentFiles.includes(splitFileInfo[1])) {
					dirTree[filePath[filePath.length - 1]].files.push(
						{
							fileName: splitFileInfo[1],
							size: splitFileInfo[0],
						}
					);
				}
			}
		}
		if (element === keys.ls) {
			//console.log(filePath);
			afterLs = true;
		}
	});
	//console.log(dirTree);
	calculateDirSizes();
};

const calculateDirSizes = () => {
	let allDirFileSizes = [];
	let allDirKeys = Object.keys(dirTree);
	//console.log(allDirKeys.length);
	let allSubDirs = [];
	allDirKeys.map((eachKey) => {
		if (eachKey === 'home') {
			return;
		}
		// if (isSubDir(allSubDirs, eachKey)) {
		// 	//skips sub dir
		// 	return;
		// }
		if (dirTree[eachKey].subDirs.length > 0) {
			let dirSizeTotal = 0;
			let thisDirSubDir = [];
			// allSubDirs.push(dirTree[eachKey].subDirs);
			dirTree[eachKey].subDirs.forEach((subDir) => {
				thisDirSubDir.push(subDir);
			});
			dirSizeTotal = calculateFileSizes(dirTree[eachKey]);

			while (thisDirSubDir.length > 0) {
				dirSizeTotal =
					dirSizeTotal +
					calculateFileSizes(dirTree[thisDirSubDir[0]]);
				if (dirTree[thisDirSubDir[0]].subDirs.length > 0) {
					// allSubDirs.push(
					// 	dirTree[thisDirSubDir[0]].subDirs
					// );

					dirTree[thisDirSubDir[0]].subDirs.forEach(
						(subDir) => {
							thisDirSubDir.push(subDir);
						}
					);
				}
				thisDirSubDir.shift();
			}

			allDirFileSizes.push({
				dirName: [eachKey],
				sizeTotal: [dirSizeTotal],
			});

			return;
		}
		let dirSizeTotal = 0;
		dirSizeTotal = calculateFileSizes(dirTree[eachKey]);

		allDirFileSizes.push({
			dirName: [eachKey],
			sizeTotal: [dirSizeTotal],
		});
	});

	//console.log(allDirFileSizes);
	getFinalNumber(allDirFileSizes);
};

const isSubDir = (array, value) => {
	let isSubDir = false;
	array.forEach((subArray) => {
		if (subArray.includes(value)) {
			isSubDir = true;
			return;
		} else {
			return;
		}
	});
	return isSubDir;
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
	//console.log(eachDir);
	//console.log(total);
};

function hasDuplicates(array) {
	return new Set(array).size !== array.length;
}
