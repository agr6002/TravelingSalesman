export class View {
    constructor(app) {
        this.app = app;
        this.con;
        this.can;
    }
    initalize() {
        this.model = this.app.model;
        this.controller = this.app.controller;
    }
    reDraw(on) {
        this.con.clearRect(0, 0, this.can.width, this.can.height);
        this.drawlines();
        this.drawCirles(on);
    }
    drawlines() {
        for (let i  = 0; i < this.model.divs.length; i++) {
            this.con.strokeStyle = "black";
            let city1 = this.citiesA[this.model.divs[i].dataset.row];
            let city2 = this.citiesA[this.model.divs[i].dataset.col];

            for (let j = 0; j < this.controller.lines.length; j++) {
                if (
                            (this.controller.lines[j][1] == city1 && this.controller.lines[j][0] == city2)
                        || 
                            (this.controller.lines[j][1] == city2 && this.controller.lines[j][0] == city1)
                    ) {
                    this.con.strokeStyle = "blue";
                }
            }
            this.con.beginPath();
            this.con.moveTo(city1[0], city1[1]);
            this.con.lineTo(city2[0], city2[1]);
            this.con.stroke();
            this.con.font = "20px Arial";
            const dx = city1[0] - city2[0];
            const dy = city1[1] - city2[1];
            const d = Math.sqrt(dy * dy + dx * dx);
            const angle = Math.atan2(dy, dx);
            this.con.fillStyle = "black";
            this.con.fillText(this.model.divs[i].value, city2[0] + 0.25 * d * Math.cos(angle), city2[1] + 0.25 * d * Math.sin(angle));
            this.con.fillText(this.model.divs[i].value, city2[0] + 0.75 * d * Math.cos(angle), city2[1] + 0.75 * d * Math.sin(angle)); 
        }
    }
    drawCirles(on) {
        this.con.textAlign = "center";
        this.con.textBaseline = "middle";
        this.con.font = "15px Arial";
        for (let i = 0; i < this.model.cities; i++) {
            this.con.fillStyle = "black";
            for (let j = 0; j < this.controller.citiesTo.length; j++) {
                if (this.controller.citiesTo[j] == this.citiesA[i]) {
                    this.con.fillStyle = "blue";                
                }
            }
            if (i == on) {
                this.con.fillStyle = "red";
            }
            this.con.beginPath();
            this.con.arc(this.citiesA[i][0], this.citiesA[i][1], 15, 0, 2 * Math.PI);
            this.con.fill();
            this.con.fillStyle = "white";
            this.con.fillText(String.fromCharCode("A".charCodeAt(0) + i), this.citiesA[i][0], this.citiesA[i][1]);
        }
    }
}