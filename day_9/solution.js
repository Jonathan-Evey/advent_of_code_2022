const fs = require('fs');

fs.readFile('input.txt', 'utf8', (error, data) => {
	if (error) {
		console.log(error);
		return;
	}
	let array = data.split('\n').map((e) => e.trim());
	formatMoves(array);
	runMoves(moves);
	//runMovesForPartTwo(moves);
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
	const setDiagonal = (input) => {
		wasDiagonalMove = input;
	};

	const position = {
		moves: eachMove,
		wasDiagonalMove: false,
		row: rowValue,
		column: columnValue,
	};
	const actions = {
		move,
		moveTail,
		setDiagonal,
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

	//runMovesPartOne(headObj);
	runMovesPartTwo(headObj);
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
	let tailKnots = [];
	for (let i = 0; i < 9; i++) {
		let tailObj = positionObj(0, 0);
		tailObj.actions.move(0, 0);
		tailKnots.push(tailObj);
	}
	startingKnot.position.moves.forEach((move, headIndex) => {
		if (headIndex > 0) {
			tailKnots.forEach((knot, index) => {
				if (index === 0) {
					checkHeadKnotToFirstTail(
						knot,
						move,
						startingKnot.position.moves[headIndex - 1]
					);
					// console.log(move, tailKnots[0].position.moves[0]);
					return;
				}
				if (index > 0) {
					let lastKnotsMove =
						tailKnots[index - 1].position.moves[0];

					// console.log(
					// 	index,
					// 	'tailKnots index',
					// 	lastKnotsMove
					// );
					checkHeadKnotToFirstTail(
						knot,
						lastKnotsMove,
						tailKnots[index - 1].position.moves[1]
					);
				}
			});
		}
	});
	let arraysToStrings = [];

	tailKnots[tailKnots.length - 1].position.moves.forEach((move) => {
		arraysToStrings.push(`${move}`);
	});

	let removedDuplicatesMove = [...new Set(arraysToStrings)];
	//console.log(removedDuplicatesMove);
	console.log(removedDuplicatesMove.length);
};

const checkHeadKnotToFirstTail = (knot, move, lastMove) => {
	let isSameRow = knot.position.moves[0][0] === move[0];
	let isSameColumn = knot.position.moves[0][1] === move[1];

	let isRowWithinOne =
		knot.position.moves[0][0] + 1 === move[0] ||
		knot.position.moves[0][0] - 1 === move[0];

	let isColumnWithinOne =
		knot.position.moves[0][1] + 1 === move[1] ||
		knot.position.moves[0][1] - 1 === move[1];

	let isRowHigher = move[0] > knot.position.moves[0][0];
	let isColumnHigher = move[1] > knot.position.moves[0][1];

	if (isSameRow && isSameColumn) {
		return;
	}
	if (isSameRow) {
		if (knot.position.moves[0][1] < move[1]) {
			knot.actions.moveTail(move[0], move[1] - 1);
		} else {
			knot.actions.moveTail(move[0], move[1] + 1);
		}
		return false;
	}
	if (isSameColumn) {
		if (knot.position.moves[0][0] < move[0]) {
			knot.actions.moveTail(move[0] - 1, move[1]);
		} else {
			knot.actions.moveTail(move[0] + 1, move[1]);
		}
		return;
	}
	if (isRowWithinOne && isColumnWithinOne) {
		return;
	}
	if (!isSameRow && !isSameColumn) {
		if (isRowHigher) {
			if (isColumnHigher) {
				knot.actions.moveTail(
					knot.position.moves[0][0] + 1,
					knot.position.moves[0][1] + 1
				);
			} else {
				knot.actions.moveTail(
					knot.position.moves[0][0] + 1,
					knot.position.moves[0][1] - 1
				);
			}
		} else {
			if (isColumnHigher) {
				knot.actions.moveTail(
					knot.position.moves[0][0] - 1,
					knot.position.moves[0][1] + 1
				);
			} else {
				knot.actions.moveTail(
					knot.position.moves[0][0] - 1,
					knot.position.moves[0][1] - 1
				);
			}
		}
		return;
	}
};
