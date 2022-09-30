function binaryToNumber(binary) {
	let number = 0;
	let split = binary.split("");

	for (let i = 0; i < split.length; i++) {
		number += Math.pow(2, split.length - 1 - i) * Number(split[i]);
	}

	return number;
}
