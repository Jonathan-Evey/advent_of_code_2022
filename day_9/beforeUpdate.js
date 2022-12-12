const fs = require('fs');

fs.readFile('input.txt', 'utf8', (error, data) => {
	if (error) {
		console.log(error);
		return;
	}
	let array = data.split('\n').map((e) => e.trim());
	console.log(array);
	formatMoves(array);
	runMoves(moves);
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

	const position = {
		moves: eachMove,
		row: rowValue,
		column: columnValue,
	};
	const actions = {
		move,
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
	generateBridgeMap(headObj);
};

const generateBridgeMap = (obj) => {
	let moveRows = [];
	let movesColumns = [];
	obj.position.moves.forEach((move) => {
		moveRows.push(move[0]);
		movesColumns.push(move[1]);
	});
	let maxHight = Math.max(...moveRows);
	let maxWidth = Math.max(...movesColumns);
	for (let i = 0; i <= maxHight; i++) {
		bridgeMap.push(Array(maxWidth + 1).fill('_'));
	}

	showMovesOnMap(obj);
};

const showMovesOnMap = (obj) => {
	let bottomOfMapIndex = bridgeMap.length - 1;
	let currentTailPosition;
	console.log(bridgeMap.length);
	obj.position.moves.forEach((move, index) => {
		if (bridgeMap[bottomOfMapIndex - move[0]][move[1]] === '-') {
			bridgeMap[bottomOfMapIndex - move[0]][move[1]] = '$';
		}
		if (index === 1) {
			bridgeMap[bottomOfMapIndex - obj.position.moves[0][0]][
				obj.position.moves[0][1]
			] = '#';
			currentTailPosition = obj.position.moves[0];
		}

		if (index > 1) {
			if (currentTailPosition[0] === move[0]) {
				if (
					currentTailPosition[1] + 1 === move[1] - 1 ||
					currentTailPosition[1] - 1 === move[1] + 1
				) {
					currentTailPosition =
						obj.position.moves[index - 1];
					bridgeMap[
						bottomOfMapIndex - currentTailPosition[0]
					][currentTailPosition[1]] = '#';
				}
				return;
			}
			if (currentTailPosition[1] === move[1]) {
				if (
					currentTailPosition[0] + 1 === move[0] - 1 ||
					currentTailPosition[0] - 1 === move[0] + 1
				) {
					currentTailPosition =
						obj.position.moves[index - 1];
					bridgeMap[
						bottomOfMapIndex - currentTailPosition[0]
					][currentTailPosition[1]] = '#';
				}
				return;
			}
			if (
				currentTailPosition[1] - move[1] === 2 ||
				currentTailPosition[1] - move[1] === -2
			) {
				currentTailPosition = obj.position.moves[index - 1];
				bridgeMap[bottomOfMapIndex - currentTailPosition[0]][
					currentTailPosition[1]
				] = '#';
				return;
			}
			if (
				currentTailPosition[0] - move[0] === 2 ||
				currentTailPosition[0] - move[0] === -2
			) {
				currentTailPosition = obj.position.moves[index - 1];
				bridgeMap[bottomOfMapIndex - currentTailPosition[0]][
					currentTailPosition[1]
				] = '#';
			}
		}
	});
	console.log(bridgeMap);
	findTailMoveCount(bridgeMap);
};

const findTailMoveCount = (array) => {
	let count = 0;
	array.forEach((eachArray) => {
		eachArray.forEach((element) => {
			if (element === '#') {
				count += 1;
			}
		});
	});
	console.log(count);
};
