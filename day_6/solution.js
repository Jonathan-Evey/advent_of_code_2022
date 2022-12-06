const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (error, data) => {
	if (error) {
		console.log(error);
		return;
	}
	data = data.split('');

	findMarker(data);
	findMessages(data);
});

const findMarker = (data) => {
	let pastLetters = [];
	let isMarkerFound = false;
	data.forEach((element, index) => {
		if (!isMarkerFound) {
			pastLetters.push(element);
			if (index >= 3) {
				let lastFour = [...pastLetters];
				lastFour = lastFour.slice(index - 3, index + 1);
				if (!hasDuplicates(lastFour)) {
					isMarkerFound = true;
				}
			}
		}
		return;
	});
	console.log(pastLetters);
	console.log(pastLetters.length);
};

const findMessages = (data) => {
	let pastLetters = [];
	let isMarkerFound = false;
	data.forEach((element, index) => {
		if (!isMarkerFound) {
			pastLetters.push(element);
			if (index >= 13) {
				let lastFour = [...pastLetters];
				lastFour = lastFour.slice(index - 13, index + 1);
				if (!hasDuplicates(lastFour)) {
					isMarkerFound = true;
				}
			}
		}
		return;
	});
	console.log(pastLetters.length);
};

const hasDuplicates = (array) => {
	let newArray = array.filter(
		(item, index) => array.indexOf(item) === index
	);
	if (newArray.length === 14) {
		return false;
	} else {
		return true;
	}
};
