const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (error, data) => {
	if (error) {
		console.log(error);
		return;
	}
	let array = data.split('\n');
	formatInput(array);
});

let eachMoveArray = [];
let crateStacks = [];

const formatInput = (array) => {
	array.map((eachLine) => {
		eachLine.includes('move')
			? eachMoveArray.push(
					eachLine.replace(/(\r\n|\n|\r)/gm, '')
			  )
			: crateStacks.push(
					////leaves a empty array at the end of the creats
					eachLine.replace(/(\r\n|\n|\r)/gm, '')
			  );
	});
	formatMoves();
	formatCrateStacks();
	// moveCrates();
	moveCratesPartTwo();
};

const formatCrateStacks = () => {
	let creteArrays = [];
	crateStacks.forEach((line, index) => {
		if (index === 0) {
			line.split('').forEach((element) => {
				creteArrays = [...creteArrays, [element]];
			});
		}
		if (line !== '' && index !== 0) {
			///skips the last array that is empty
			line.split('').forEach((element, index) => {
				creteArrays[index].push(element);
			});
		}
	});

	///remove arrays that are not crate stacks
	crateStacks = creteArrays.filter(
		(array) => array[array.length - 1] !== ' '
	);

	removeEmptyStrings();
};

const formatMoves = () => {
	let moveNumbersArrays = [];
	eachMoveArray.forEach((line) => {
		let numbersArray = [];
		line.split(' ').forEach((letter) => {
			if (isNumber(letter)) {
				numbersArray.push(letter);
			}
		});
		numbersArray = crateMoveFactory(
			Number(numbersArray[0]),
			Number(numbersArray[1]),
			Number(numbersArray[2])
		);
		moveNumbersArrays.push(numbersArray);
	});
	eachMoveArray = moveNumbersArrays;
};

const crateMoveFactory = (cratesToMove, fromStack, toStack) => {
	return {
		cratesToMove,
		fromStack,
		toStack,
	};
};

const removeEmptyStrings = () => {
	let filteredArrays = [];
	crateStacks.forEach((array) => {
		array = array.filter((element) => element !== ' ');
		filteredArrays.push(array);
	});
	crateStacks = filteredArrays;
};

const moveCrates = () => {
	eachMoveArray.forEach((move) => {
		let cratesBeingMoved = [];
		for (let i = 0; i < move.cratesToMove; i++) {
			cratesBeingMoved.unshift(
				crateStacks[move.fromStack - 1][i]
			);
		}
		let stackWithCratesRemoved = crateStacks[
			move.fromStack - 1
		].splice(
			move.cratesToMove,
			crateStacks[move.fromStack - 1].length
		);
		let stackWithCratesAdded = cratesBeingMoved.concat(
			crateStacks[move.toStack - 1]
		);

		let currentCrateStacks = [];
		crateStacks.forEach((stack, index) => {
			if (index === move.fromStack - 1) {
				currentCrateStacks.push(stackWithCratesRemoved);
				return;
			} else if (index === move.toStack - 1) {
				currentCrateStacks.push(stackWithCratesAdded);
				return;
			} else {
				currentCrateStacks.push(stack);
			}
		});
		crateStacks = currentCrateStacks;
	});
	formatStackTops();
};

const moveCratesPartTwo = () => {
	eachMoveArray.forEach((move) => {
		let cratesBeingMoved = [];
		for (let i = 0; i < move.cratesToMove; i++) {
			cratesBeingMoved.push(crateStacks[move.fromStack - 1][i]);
		}
		let stackWithCratesRemoved = crateStacks[
			move.fromStack - 1
		].splice(
			move.cratesToMove,
			crateStacks[move.fromStack - 1].length
		);
		let stackWithCratesAdded = cratesBeingMoved.concat(
			crateStacks[move.toStack - 1]
		);

		let currentCrateStacks = [];
		crateStacks.forEach((stack, index) => {
			if (index === move.fromStack - 1) {
				currentCrateStacks.push(stackWithCratesRemoved);
				return;
			} else if (index === move.toStack - 1) {
				currentCrateStacks.push(stackWithCratesAdded);
				return;
			} else {
				currentCrateStacks.push(stack);
			}
		});
		crateStacks = currentCrateStacks;
	});
	console.log('part Two');
	formatStackTops();
};

const formatStackTops = () => {
	let arrangement;
	crateStacks.forEach((array, index) => {
		if (index === 0) {
			return (arrangement = array[0]);
		}
		arrangement = arrangement + array[0];
	});
	console.log(arrangement);
};

const isNumber = (char) => {
	if (typeof char !== 'string') {
		return false;
	}

	if (char.trim() === '') {
		return false;
	}
	return !isNaN(char);
};
