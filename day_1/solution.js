const fs = require('fs');

let eachElfsCalArrays = [];

fs.readFile('input.txt', 'utf8', (error, data) => {
	if (error) {
		console.log(error);
		return;
	}
	let array = data.split('\n').map((e) => e.trim());
	formatElfArrays(array);
});

const formatElfArrays = (data) => {
	let eachElf = [];
	data.forEach((entry) => {
		if (entry !== '') {
			eachElf.push(entry);
		} else {
			eachElfsCalArrays.push(eachElf);
			eachElf = [];
		}
	});
	findHighestCalAmount(eachElfsCalArrays);
	findHighestThreeCalAmounts(eachElfsCalArrays);
};

const findHighestCalAmount = (array) => {
	let highest = 0;
	array.forEach((entry) => {
		let total = 0;
		entry.forEach((subEntry) => {
			total = total + Number(subEntry);
		});
		if (total > highest) {
			highest = total;
		}
	});
	console.log(highest);
};

const findHighestThreeCalAmounts = (array) => {
	let totals = [];
	array.forEach((entry) => {
		let total = 0;
		entry.forEach((subEntry) => {
			total = total + Number(subEntry);
		});
		totals.push(total);
	});
	totals.sort(function (a, b) {
		return b - a;
	});
	console.log(totals[0] + totals[1] + totals[2]);
};
