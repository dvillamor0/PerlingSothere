class Esfera{
    constructor(h,w,r){
        this.h = h;
        this.w = w;
        this.r = r;
    }

    dibujar(flying) {

        const influencia = 2; //parametro que varia la influencia del perling

        let terrain = []

        for (let fila = 0; fila <= this.h+1; fila++) {
            let lista = [];
            for (let columna = 0; columna <= this.w; columna++) {
                lista.push(0);
            }
            terrain.push(lista);
        }

        let yoff = flying;
        flying -= 0.1;

        for (let fila = 0; fila <= this.h; fila++) {
            let xoff = 0;
            for (let columna = 0; columna <= this.w; columna++) {
                terrain[fila][columna] = noise(xoff, yoff) * this.r;
                xoff += 0.1;
            }
            yoff += 0.1;
        }
        for (let columna = 0; columna <= this.w; columna++) {
            terrain[this.h][columna] = (terrain[0][columna] + terrain[this.h][columna]) / 2;
            terrain[this.h+1][columna] = terrain[0][columna];
        }

        const dAlpha = Math.PI / this.w;
        const dBeta = 2 * Math.PI / this.h;

        let off = 0;

        for (let fila = 0; fila <= this.h; fila++) {
            beginShape(TRIANGLE_STRIP);
            for (let columna = 0; columna <= this.w; columna++) {

                off = terrain[fila][columna] * influencia;

                const x = (this.r + off) * Math.sin(columna * dAlpha) * Math.cos(fila * dBeta);
                const y = (this.r + off) * Math.cos(columna * dAlpha);
                const z = (this.r + off) * Math.sin(columna * dAlpha) * Math.sin(fila * dBeta);

                vertex(x, y, z);

                off = terrain[fila+1][columna] * influencia;
                const xNext = (this.r + off) * Math.sin(columna * dAlpha) * Math.cos((fila + 1) * dBeta);
                const yNext = (this.r + off) * Math.cos(columna * dAlpha);
                const zNext = (this.r + off) * Math.sin(columna * dAlpha) * Math.sin((fila + 1) * dBeta);

                vertex(xNext, yNext, zNext);
            }
            endShape();
        }
    }

}