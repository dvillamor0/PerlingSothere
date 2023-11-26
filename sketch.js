let esfera = null;
let flying = 0;

function setup() 
{
	canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    canvas.parent("canvas");

    esfera = new Esfera(60,60,100);

    windowResized();
}

function draw()
{
    background(100);
    frameRate(24);
    orbitControl();

    //noStroke();

    esfera.dibujar(flying);
    flying -= 0.03;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }