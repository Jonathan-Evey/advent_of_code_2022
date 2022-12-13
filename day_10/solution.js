const fs = require('fs');

fs.readFile('input.txt', 'utf8', (error, data) => {
	if (error) {
		console.log(error);
		return;
	}
	let array = data.split('\n').map((e) => e.trim());
	formatInstructions(array);
	runSignals();
	console.log(signalStrengthCycleArray);
	getTotal();
	formatScreenArray();
});

const instructionObjsArray = [];
const screenDisplay = [];

let registerCurrentValue = 1;

const signalStrengthCycleArray = [];

const formatInstructions = (array) => {
	array.forEach((element, index) => {
		element = element.split(' ');
		if (!element[1]) {
			instructionObjsArray.push(
				instructionFactory(element[0], 0)
			);
			return;
		}
		instructionObjsArray.push(
			instructionFactory(element[0], Number(element[1]))
		);
	});
	setCycleStartValues();
};

const setCycleStartValues = () => {
	let cycleCount = 1;
	instructionObjsArray.forEach((instruction) => {
		cycleCount = cycleCount + instruction.signal.cycles;
		instruction.signal.setCycleStart(cycleCount);
	});
};

const instructionFactory = (cycleTurnValue, registerValue) => {
	const setCycleStart = (number) => {
		signal.updateOnCycle = number;
	};
	let formatTurnValue = cycleTurnValue === 'addx' ? 2 : 1;

	let signal = {
		cycles: formatTurnValue,
		changeValue: registerValue,
		updateOnCycle: 0,
		setCycleStart,
	};
	return {
		signal,
	};
};

const cycleNumber = (cycleNumber) => {
	signalStrengthCycleArray.push({
		signalStrength: cycleNumber * registerCurrentValue,
		cycleNumber: cycleNumber,
	});
};

const runSignals = () => {
	let currenSignalCycle = 1;
	instructionObjsArray.forEach((instruction) => {
		for (
			let i =
				instruction.signal.updateOnCycle - currenSignalCycle;
			i > 0;
			i--
		) {
			let spritePosition = currenSignalCycle;
			if (currenSignalCycle > 40 && currenSignalCycle < 81) {
				spritePosition = spritePosition - 40;
			}
			if (currenSignalCycle > 80 && currenSignalCycle < 120) {
				spritePosition = spritePosition - 80;
			}
			if (currenSignalCycle > 120 && currenSignalCycle < 160) {
				spritePosition = spritePosition - 120;
			}
			if (currenSignalCycle > 160 && currenSignalCycle < 200) {
				spritePosition = spritePosition - 160;
			}
			if (currenSignalCycle > 200 && currenSignalCycle < 240) {
				spritePosition = spritePosition - 200;
			}
			if (currenSignalCycle > 240) {
				spritePosition = spritePosition - 240;
			}

			if (
				between(
					spritePosition - 1,
					registerCurrentValue - 1,
					registerCurrentValue + 1
				)
			) {
				screenDisplay.push('#');
			} else {
				screenDisplay.push('.');
			}
			if (currenSignalCycle === 20) {
				cycleNumber(20);
			}
			if (currenSignalCycle === 60) {
				cycleNumber(60);
			}
			if (currenSignalCycle === 100) {
				cycleNumber(100);
			}
			if (currenSignalCycle === 140) {
				cycleNumber(140);
			}
			if (currenSignalCycle === 180) {
				cycleNumber(180);
			}
			if (currenSignalCycle === 220) {
				cycleNumber(220);
			}
			currenSignalCycle = currenSignalCycle + 1;
		}
		registerCurrentValue =
			registerCurrentValue + instruction.signal.changeValue;
	});
	console.log(registerCurrentValue);
};

const getTotal = () => {
	let total = signalStrengthCycleArray.reduce((a, b) => {
		return a + b.signalStrength;
	}, 0);
	console.log(total);
};

const formatScreenArray = () => {
	console.log(screenDisplay);
	let firstRow = screenDisplay.slice(0, 40).join('');
	let secondRow = screenDisplay.slice(40, 80).join('');
	let thirdRow = screenDisplay.slice(80, 120).join('');
	let fourthRow = screenDisplay.slice(120, 160).join('');
	let fithRow = screenDisplay.slice(160, 200).join('');
	let sixthRow = screenDisplay.slice(200, 240).join('');
	console.log(firstRow);
	console.log(secondRow);
	console.log(thirdRow);
	console.log(fourthRow);
	console.log(fithRow);
	console.log(sixthRow);
};

const between = (value, min, max) => {
	return value >= min && value <= max;
};
