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
});

const instructionObjsArray = [];

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
