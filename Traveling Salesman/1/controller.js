export class Controller {
    constructor(app) {
        this.app = app;
        this.model = this.app.model;
        this.first = null;
        this.table = document.getElementById("cities-table");
        this.numberDiv = document.getElementById("number");
        this.distanceDisplay = document.getElementById("score");
        this.citisDiv = document.getElementById("cities");
    }
    initalize() {
        document.getElementById("up").addEventListener("click", this.up.bind(this));
        document.getElementById("down").addEventListener("click", this.down.bind(this));
        document.getElementById("go").addEventListener("click", this.go.bind(this));
    }
    up() {
        this.model.numberDiv.innerHTML = Number(this.model.numberDiv.innerHTML) + 1;
    }
    down() {
        let num = this.model.numberDiv.innerHTML;
        if (Number(num) > 2) {
            this.model.numberDiv.innerHTML = Number(num) - 1;
        }
    }
    go() {
        switch (this.model.goStatus) {
            case 0:
                this.model.createTable();
            break;
            case 1:
                if(this.model.canCreateVillages()) {
                    this.citiesTo.push(this.app.view.citiesA[0]);
                    this.view.can.addEventListener("click", this.clicked.bind(this));           
                }
            break;
        }
    }
    clicked(e) {
        if (this.first == null) {
            this.first = {
                x: e.clientX,
                y: e.clientY
            };  
        }
        else {
            const c1 = this.model.findCityByPos(this.first.x, this.first.y);
            const c2 = this.model.findCityByPos(e.clientX, e.clientY);
            this.model.distanceNumber += this.model.findDivByCity(c1, c2).value;
            this.distanceDisplay.innerHTML = this.model.distanceNumber;
            this.citiesTo.push(c2);
            this.lines.push([c1, c2]);
            this.app.view.reDraw(this.model.getIndex(c2));
            this.first = null;
        }
    }
}