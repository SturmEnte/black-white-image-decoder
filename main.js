const canvas = document.getElementsByTagName("canvas")[0];
const form = document.getElementsByTagName("form")[0];
const inputElement = document.getElementById("input");
const decodeBtn = document.getElementById("decode");
const widthElement = document.getElementById("width");
const heightElement = document.getElementById("height");

const ctx = canvas.getContext("2d");
clearCanvas();

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

window.addEventListener("resize", () => {
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
});

decodeBtn.addEventListener("click", () => {
	decode();
});

function decode() {
	let input = inputElement.value.replace(/\s/g, "").split("");
	let current = "";
	let j = 0;
	let x = 0;
	let y = 0;
	let part = 0;
	let width = 0;
	let height = 0;
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
						width = Number(String(width) + String(n));
					} else {
						height = Number(String(height) + String(n));
					}

					j = 0;
					current = "";
				}
			}
		} else {
			// Initialize the pixel size and clear the canvas
			if (part == 2) {
				pixelSize = canvas.width / width;
				if (canvas.height / height < pixelSize) pixelSize = canvas.height / height;
				widthElement.innerHTML = `Width: ${width}`;
				heightElement.innerHTML = `Height: ${height}`;
				console.log("Width: ", width, "px");
				console.log("Height: ", height, "px");
				console.log("Pixel Size: ", pixelSize, "px");
				clearCanvas();
				part++;
			}

			// Draw the current pixel
			console.log(`(${x}|${y}) ${input[i]}`);
			if (input[i] == "1") {
				ctx.fillStyle = "black";
				ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
			} else {
				ctx.fillStyle = "white";
				ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
			}

			// Check if the current pixel is at the end of a row
			// And if so, set x to 0 and increase y by 1
			x++;
			if (x >= width) {
				x = 0;
				y++;
			}
		}
	}
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // For Firefox support
	ctx.fillStyle = "grey";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
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
	return NaN;
}
