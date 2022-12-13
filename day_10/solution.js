const fs = require('fs');

fs.readFile('testInput.txt', 'utf8', (error, data) => {
	if (error) {
		console.log(error);
		return;
	}
	let array = data.split('\n').map((e) => e.trim());
	console.log(array);
});
