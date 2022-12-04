const fs = require('fs');

fs.readFile('input.txt', 'utf8', (error, data) => {
	if (error) {
		console.log(error);
		return;
	}
	let array = data.split('\n').map((e) => e.trim());
	let arrayPairs = array.map((each) => each.split(','));
	formatAssignmentPairs(arrayPairs);
});

const formatAssignmentPairs = (array) => {
	let allPairs = [];
	array.map((eachPair) => {
		let highLowPairs = [];
		eachPair.map((each) => {
			highLowPairs.push(each.split('-'));
		});
		allPairs.push(highLowPairs);
	});
	checkForOverlap(allPairs);
};

const checkForOverlap = (array) => {
	let totalPairsFullyOverlapping = [];
	array.map((eachPair) => {
		if (isPairFullyOverlapping(eachPair)) {
			totalPairsFullyOverlapping.push(1);
		}
	});
	let totalPairsOverlapping = [];
	array.map((eachPair) => {
		if (isPairOverlapping(eachPair)) {
			totalPairsOverlapping.push(1);
		}
	});
	console.log(
		totalPairsFullyOverlapping.reduce((a, b) => a + b, 0)
	);
	console.log(totalPairsOverlapping.reduce((a, b) => a + b, 0));
};

const isPairFullyOverlapping = (array) => {
	if (
		Number(array[0][0]) >= Number(array[1][0]) &&
		Number(array[0][1]) <= Number(array[1][1])
	) {
		return true;
	} else if (
		Number(array[1][0]) >= Number(array[0][0]) &&
		Number(array[1][1]) <= Number(array[0][1])
	) {
		return true;
	}
};

const isPairOverlapping = (array) => {
	if (
		Number(array[0][0]) <= Number(array[1][1]) &&
		Number(array[0][1]) >= Number(array[1][0])
	) {
		return true;
	} else if (
		Number(array[1][0]) >= Number(array[0][1]) &&
		Number(array[1][1]) <= Number(array[0][0])
	) {
		return true;
	}
};
