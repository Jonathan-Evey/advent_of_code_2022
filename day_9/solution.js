const fs = require('fs');

fs.readFile('testInput.txt', 'utf8', (error, data) => {
	if (error) {
		console.log(error);
		return;
	}
	let array = data.split('\n').map((e) => e.trim());
	formatMoves(array);
	//runMoves(moves);
	runMovesForPartTwo(moves);
});

let bridgeMap = [];
let moves = [];

const moveDirectionsKeys = {
	up: 'U',
	down: 'D',
	left: 'L',
	right: 'R',
};

const formatMoves = (array) => {
	array.map((each) => {
		each = each.split(' ');
		moves.push({
			direction: each[0],
			distance: each[1],
		});
	});
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
		eachMove.push([position.row, position.column]);
	};

	const moveTail = (row, column) => {
		eachMove.unshift([row, column]);
	};

	const position = {
		moves: eachMove,
		row: rowValue,
		column: columnValue,
	};
	const actions = {
		move,
		moveTail,
	};

	return {
		position,
		actions,
	};
};

const runMoves = (objArray) => {
	let headObj = positionObj(0, 0);
	headObj.actions.move(0, 0);
	objArray.forEach((element, index) => {
		for (let i = 0; i < element.distance; i++) {
			headObj.actions.move(element.direction, 1);
		}
	});

	runMovesPartOne(headObj);
};

const runMovesForPartTwo = (objArray) => {
	let headObj = positionObj(0, 0);
	headObj.actions.move(0, 0);
	objArray.forEach((element, index) => {
		headObj.actions.move(
			element.direction,
			Number(element.distance)
		);
	});
	console.log(headObj.position.moves);
	runMovesPartTwo(headObj);
};

// const generateBridgeMap = (obj) => {
// 	let moveRows = [];
// 	let movesColumns = [];
// 	obj.position.moves.forEach((move) => {
// 		moveRows.push(move[0]);
// 		movesColumns.push(move[1]);
// 	});
// 	let maxHight = Math.max(...moveRows);
// 	let maxWidth = Math.max(...movesColumns);
// 	for (let i = 0; i <= maxHight; i++) {
// 		bridgeMap.push(Array(maxWidth + 1).fill('_'));
// 	}

// 	runMovesPartOne(obj);
// };

const runMovesPartOne = (obj) => {
	let tailObj = positionObj(0, 0);
	obj.position.moves.forEach((move, index) => {
		if (index === 1) {
			tailObj.actions.move(0, 0);
		}

		if (index > 1) {
			if (tailObj.position.moves[0][0] === move[0]) {
				if (
					tailObj.position.moves[0][1] + 1 ===
						move[1] - 1 ||
					tailObj.position.moves[0][1] - 1 === move[1] + 1
				) {
					tailObj.actions.moveTail(
						obj.position.moves[index - 1][0],
						obj.position.moves[index - 1][1]
					);
				}
				return;
			}
			if (tailObj.position.moves[0][1] === move[1]) {
				if (
					tailObj.position.moves[0][0] + 1 ===
						move[0] - 1 ||
					tailObj.position.moves[0][0] - 1 === move[0] + 1
				) {
					tailObj.actions.moveTail(
						obj.position.moves[index - 1][0],
						obj.position.moves[index - 1][1]
					);
				}
				return;
			}
			if (
				tailObj.position.moves[0][1] - move[1] === 2 ||
				tailObj.position.moves[0][1] - move[1] === -2
			) {
				tailObj.actions.moveTail(
					obj.position.moves[index - 1][0],
					obj.position.moves[index - 1][1]
				);
				return;
			}
			if (
				tailObj.position.moves[0][0] - move[0] === 2 ||
				tailObj.position.moves[0][0] - move[0] === -2
			) {
				tailObj.actions.moveTail(
					obj.position.moves[index - 1][0],
					obj.position.moves[index - 1][1]
				);
			}
		}
	});
	let arrayToString = [];
	tailObj.position.moves.forEach((move) => {
		arrayToString.push(`${move}`);
	});

	let removedDuplicatesMove = [...new Set(arrayToString)];

	console.log(removedDuplicatesMove.length);
};

const runMovesPartTwo = (startingKnot) => {
	let tailKnots = [startingKnot];
	console.log(tailKnots);
	for (let i = 0; i < 9; i++) {
		let tailObj = positionObj(0, 0);
		tailObj.actions.move(0, 0);
		tailKnots.push(tailObj);
	}
	console.log(tailKnots);
	console.log(tailKnots.length);
	startingKnot.position.moves.forEach((move, index) => {
		if (i !== 0) {
			headKnot.position.moves =
				headKnot.position.moves.reverse();
		}
	});

	// let arraysToStrings = [];
	// for (i = 1; i < tailKnots.length; i++) {
	// 	tailKnots[i].position.moves.forEach((move) => {
	// 		arraysToStrings.push(`${move}`);
	// 	});
	// }
	// let removedDuplicatesMove = [...new Set(arraysToStrings)];

	// console.log(removedDuplicatesMove.length);
};
