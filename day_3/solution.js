const fs = require('fs');

fs.readFile('input.txt', 'utf8', (error, data) => {
	if (error) {
		console.log(error);
		return;
	}
	let array = data.split('\n').map((e) => e.trim());
	splitStringInHalf(array);
	partTwoGroupIntoThrees(array);
});

const splitStringInHalf = (array) => {
	let eachPack = [];
	array.forEach((string) => {
		let stringLength = string.length;
		let eachPackSide = [];
		eachPackSide.push(
			string.split('').slice(0, stringLength / 2),
			string.split('').slice(stringLength / 2, stringLength)
		);
		eachPack.push(eachPackSide);
	});
	checkForMatch(eachPack);
};

const checkForMatch = (array) => {
	let eachMatch = [];
	array.forEach((rucksack) => {
		let matchingItems = [];
		rucksack[0].map((sideOneItem) => {
			rucksack[1].map((sideTwoItem) => {
				if (sideTwoItem === sideOneItem) {
					matchingItems.push(sideOneItem);
				}
			});
		});
		eachMatch.push(matchingItems[0]);
	});
	getCharCodeValue(eachMatch);
};

const getCharCodeValue = (array) => {
	let itemValueArray = [];
	array.forEach((item) => {
		itemValueArray.push(item.charCodeAt());
	});
	getItemPriorities(itemValueArray);
};

const getItemPriorities = (array) => {
	let priorityValues = [];
	array.forEach((number) => {
		if (number > 96) {
			priorityValues.push(number - 96);
		}
		if (number < 97) {
			priorityValues.push(number - 38);
		}
	});
	let total = priorityValues.reduce((a, b) => a + b, 0);
	console.log(total);
};

const partTwoGroupIntoThrees = (array) => {
	let allGroups = [];
	let eachGroup = [];
	let count = 0;
	array.map((eachElf) => {
		if (count < 3) {
			eachGroup.push(eachElf);
		}
		count = count + 1;
		if (count === 3) {
			allGroups.push(eachGroup);
			eachGroup = [];
			count = 0;
		}
	});
	findGroupBadge(allGroups);
};

const findGroupBadge = (array) => {
	let allGroupBages = [];
	array.forEach((group) => {
		let matchingLetters = findBadge(group);
		allGroupBages.push(matchingLetters);
	});
	getCharCodeValue(allGroupBages);
};

const findBadge = (array) => {
	let arraySplit = [];
	array.forEach((each) => {
		arraySplit.push(each.split(''));
	});
	let badgeLetter = [];
	arraySplit[0].forEach((elfOneItem) => {
		arraySplit[1].forEach((elfTwoItem) => {
			if (elfOneItem === elfTwoItem) {
				arraySplit[2].forEach((elfThreeItem) => {
					if (
						elfThreeItem === elfOneItem &&
						elfThreeItem === elfTwoItem
					) {
						badgeLetter.push(elfThreeItem);
					}
				});
			}
		});
	});
	return badgeLetter[0];
};
