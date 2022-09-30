const canvas = document.getElementsByTagName("canvas")[0];
const form = document.getElementsByTagName("form")[0];
const inputElement = document.getElementById("input");
const decodeBtn = document.getElementById("decode");

const ctx = canvas.getContext("2d");

form.addEventListener("submit", (e) => {
	e.preventDefault();
});

decodeBtn.addEventListener("click", () => {
	decode();
});

function decode() {
	let input = inputElement.value.split("");
	let current = "";
	let j = 0;
	let part = 0;
	let x = 0;
	let y = 0;
	let pixelSize = 0;

	for (let i = 0; i < input.length; i++) {
		if (part < 2) {
			current += input[i];
			j++;

			if (j == 8) {
				if (current == "00000000") {
					part++;
					j = 0;
					current = "";
				} else {
					let n = binaryAsciiToNumber(current);

					if (part == 0) {
						x = Number(String(x) + String(n));
					} else {
						y = Number(String(y) + String(n));
					}

					j = 0;
					current = "";
				}
			}
		} else {
			if (part == 2) {
				console.log("X: ", x);
				console.log("Y: ", y);
				pixelSize = canvas.width / x;
				part++;
				continue;
			}
		}
	}
}

function binaryAsciiToNumber(binary) {
	switch (binary) {
		case "00110000":
			return 0;
		case "00110001":
			return 1;
		case "00110010":
			return 2;
		case "00110011":
			return 3;
		case "00110100":
			return 4;
		case "00110101":
			return 5;
		case "00110110":
			return 6;
		case "00110111":
			return 7;
		case "00111000":
			return 8;
		case "00111001":
			return 9;
	}
}
