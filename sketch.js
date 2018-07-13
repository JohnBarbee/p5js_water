var buff1Water = []
var buff2Water = []
var w;
var h;
var damping;

function setup() {
	w = h = 400
	damping = 0.925

	createCanvas(w,h)
	pixelDensity(1)


	for(var i = 0; i < w; i++){
		buff1Water[i] = [];
		buff2Water[i] = [];
		for(var j = 0; j < h; j++){
			buff1Water[i][j] = 0;
			buff2Water[i][j] = 0;
		}
	}
}

function draw() {
	background(0)
	loadPixels()
	for(let i = 1; i < (w)-1; i++){
		for(let j = 1; j < (h)-1; j++){
			buff2Water[i][j] = (buff1Water[i-1][j] +
								buff1Water[i+1][j] +
								buff1Water[i][j-1] +
								buff1Water[i][j+1] +
								buff1Water[i+1][j+1] +
								buff1Water[i+1][j-1] +
								buff1Water[i-1][j+1] +
								buff1Water[i-1][j-1]) /4 - buff2Water[i][j];
			buff2Water[i][j] = buff2Water[i][j] * damping;
			let index = (i + j * width) * 4;
			pixels[index] = buff2Water[i][j] * 255;
			pixels[index + 1] = buff2Water[i][j] * 255;
			pixels[index + 2] = buff2Water[i][j] * 255;
			pixels[index + 3] = 255;
		}
	}
	updatePixels()

	let temp = buff1Water
	buff1Water = buff2Water;
	buff2Water = temp;
}

function mouseDragged(){
	if(mouseX > 0 && mouseX < w - 1 && mouseY > 0 && mouseY < h -1)
	buff2Water[mouseX][mouseY] = 255
}