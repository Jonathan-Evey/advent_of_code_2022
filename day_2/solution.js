const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (error, data) => {
	if (error) {
		console.log(error);
		return;
	}
	let array = data.split('\n').map((e) => e.trim().split(' '));
	runEachRoundForPartOne(array);
	runEachRoundForPartTwo(array);
});

const runEachRoundForPartOne = (array) => {
	let pointsForEachGame = [];
	array.forEach((game) => {
		let gameTotal = 0;
		gameTotal =
			checkPlayValue(game[1]) +
			checkOutcomeForPartOne(
				checkPlayValue(game[0]),
				checkPlayValue(game[1])
			);
		pointsForEachGame.push(gameTotal);
	});
	let total = getTotal(pointsForEachGame);
	console.log(total);
};

const runEachRoundForPartTwo = (array) => {
	let pointsForEachGame = [];
	array.forEach((game) => {
		let gameTotal = 0;
		gameTotal =
			checkPlayValueForPartTwo(game[0], game[1]) +
			checkOutcomeForPartTwo(checkPlayValue(game[1]));
		pointsForEachGame.push(gameTotal);
	});
	let total = getTotal(pointsForEachGame);
	console.log(total);
};

const checkPlayValue = (letter) => {
	if (letter === 'A' || letter === 'X') {
		return 1;
	}
	if (letter === 'B' || letter === 'Y') {
		return 2;
	}
	if (letter === 'C' || letter === 'Z') {
		return 3;
	}
};

const checkPlayValueForPartTwo = (elfPlay, myPlay) => {
	if (elfPlay === 'A') {
		if (myPlay === 'X') {
			return 3;
		} else if (myPlay === 'Z') {
			return 2;
		} else {
			return 1;
		}
	}
	if (elfPlay === 'B') {
		if (myPlay === 'X') {
			return 1;
		} else if (myPlay === 'Z') {
			return 3;
		} else {
			return 2;
		}
	}
	if (elfPlay === 'C') {
		if (myPlay === 'X') {
			return 2;
		} else if (myPlay === 'Z') {
			return 1;
		} else {
			return 3;
		}
	}
};

const checkOutcomeForPartOne = (elfPlay, myPlay) => {
	if (elfPlay === 1) {
		if (myPlay === 1) {
			return 3;
		} else if (myPlay === 2) {
			return 6;
		} else {
			return 0;
		}
	}
	if (elfPlay === 2) {
		if (myPlay === 2) {
			return 3;
		} else if (myPlay === 3) {
			return 6;
		} else {
			return 0;
		}
	}
	if (elfPlay === 3) {
		if (myPlay === 3) {
			return 3;
		} else if (myPlay === 1) {
			return 6;
		} else {
			return 0;
		}
	}
};

const checkOutcomeForPartTwo = (myPlay) => {
	if (myPlay === 1) {
		return 0;
	}
	if (myPlay === 2) {
		return 3;
	}
	if (myPlay === 3) {
		return 6;
	}
};

const getTotal = (array) => {
	let total = 0;
	array.forEach((gamePoints) => {
		total = total + gamePoints;
	});
	return total;
};
