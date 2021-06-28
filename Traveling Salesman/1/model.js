export class Model {
    constructor(app) {
        this.app = app;
        this.table = document.getElementById("cities-table");
        this.numberDiv = document.getElementById("number");
        this.divs = [];
        this.cities;
        this.citiesTo = [];
        this.lines = [];
        this.citiesA = [];
        this.goStatus = 0;
    }
    initalize() {
        this.view = this.app.view;
    }
    createTable() {
        this.goStatus += 1;
        this.cities = Number(this.numberDiv.innerHTML);
        let row = this.table.insertRow();
        row.insertCell();
    
        for (let i = 0; i < this.cities; i++) {
            row.insertCell().innerHTML = String.fromCharCode("A".charCodeAt(0) + i);
        }
    
        for (let i = 0; i < this.cities; i++) {
            row =this.table.insertRow();
            row.insertCell().innerHTML = String.fromCharCode("A".charCodeAt(0) + i);
    
            for (let j = 0; j < this.cities; j++) {
                let cell = row.insertCell();
                if (j > i) {
                    const it = document.createElement("input");
                    it.setAttribute("type", "text");
                    it.placeholder = "length between";
                    it.dataset.row = i;
                    it.dataset.col = j;
                    it.classList.add("it");
    
                    it.addEventListener("input", (e) => {
                        const rows = this.table.rows;
                        const row = e.target.dataset.row;
                        const col = e.target.dataset.col;
                        rows[Number(col) + 1].cells[Number(row) + 1].innerHTML = e.target.innerHTML;
                        // for (let div of this.divs) {
                        //     rows[Number(div.dataset.col) + 1].cells[Number(div.dataset.row) + 1].innerHTML = div.innerHTML;
                        // }
                    });
    
                    cell.appendChild(it);
                    this.divs.push(it);
    
                } else if (j === i) {
                    cell.style.backgroundColor = "red";
    
                } else {
                    cell.style.backgroundColor = "#cccccc";
    
                }
            }
        }
        document.getElementById("up").parentNode.removeChild(document.getElementById("up"));
        document.getElementById("down").parentNode.removeChild(document.getElementById("down"));
        number.parentNode.removeChild(number);
    }
    
    CanCreateVillages() {
        this.goStatus += 1;
        let isAllNumbers = true;
        let numbers = [];
    
        for (let i = 0; i < this.divs.length; i++) {
            const text = this.divs[i].innerText;
            if (isNaN(text)) {
                isAllNumbers = false;
            } else {
                const num = Number(text);
                if (num < 0) {
                    isAllNumbers = false;
                } else {
                    numbers.push(Number(text));
                }
            }
        }
        if (isAllNumbers === true) {
            this.createVillages();
        }
    }
    createVillages() {
        this.table.parentNode.removeChild(this.model.table);
        this.view.can = document.createElement("canvas");
        this.can.height = document.getElementById("cities").clientHeight;
        this.can.width = document.getElementById("cities").clientWidth;
        document.getElementById("cities").appendChild(this.can);
        this.con = this.can.getContext("2d");
        this.reDraw(0, [], []);
        this.can.addEventListener("click", this.app.controller.clicked.bind(this.app.controller));           
        const angle = 2 * Math.PI / this.model.cities;
        for (let i = 0; i < this.model.cities; i++) {
            let x = this.can.width / 2 + (this.can.width / 2 - 40) * Math.cos(angle * i);
            let y = this.can.height / 2 + (this.can.height / 2 - 40) * Math.sin(angle * i);
            this.citiesA.push([x, y, String.fromCharCode("A".charCodeAt(0) + i)]);
        } 
    }
    findCityByPos(x, y) {         
        let city  = this.view.citiesA[0];
        for (let i = 1; i < this.view.citiesA.length; i++) {
        const dx1 = city[0] - x;
        const dy1 = city[1] - y;
        const dx2 = this.view.citiesA[i][0] - x;
        const dy2 = this.view.citiesA[i][1] - y;
        if (Math.sqrt(dx1 * dx1 + dy1 * dy1) > Math.sqrt(dx2 * dx2 + dy2 * dy2)) {
            city = this.view.citiesA[i];
        }
        }
        return city;
    }
    getIndex(c) {
        let ind = -1;
        for (let i = 0; i  < this.cities; i++) {
            if (this.view.citiesA[i] == c) {
                ind = i;
            }
        }
        if (ind !== -1) {
            return ind;
        }
    }
    findDivByCity(c1, c2){
        for (let j = 0; j < this.divs.length; j++) {
            if (
                        (this.divs[j].dataset.row == c1 && this.divs.dataset.col == c2)
                    || 
                        (this.divs[j].dataset.row == c2 && this.divs[j].dataset.col == c1)
                ) {
                return this.divs[j];
            }
        }
    }
    fastestRoute() {
        this.shortestLength = 0;
       // for (let i = )
        this.shortestRoute = [];
        this.try([this.divs[0]], 0);
        console.log(this.shortestLength + " short");
        console.log(this.shortestRoute + " route");
        return [this.shortestLength, this.shortestRoute];
    }
    // try(previous, length) {
    //     console.log(previous);
    //     console.log("previus");
    //     if (previous.length > this.divs.length) {
    //         return
    //     }
    //     // console.log(length + " length");
    //     for (let i = 0; i < this.divs.length; i++) {
    //         console.log("in");
    //         let notDone = true;
    //         for (let j = 0; j < previous; j ++) {
    //             if (this.divs[previous[j]] === this.divs[i]) {
    //                 notDone = false;
    //             }
    //         }
    //         console.log(notDone + " notDone");
    //         let len = length + Number(this.divs[i].value);
    //         if (notDone) {
    //             const a = previous;
    //             a.push(i);
    //             this.try(a, len);
    //         }else {
    //             if (len < this.shortestLength) {
    //                 this.shortestLength = len;
    //                 console.log(this.shortestLength + " short2");
    //                 this.shortestRoute = previous
    //                 this.shortestRoute.push(i);
    //             }
    //         }
    //     }
    // }
    try(previous, length) {
        let all = true;
        for (let i = 0; i < this.divs.length; i++) {
            let one = false;
            for (let j = 0; j < pervious.length; j++) {
                if (pervious[j] == this.divs[i]) {
                    one = true;
                }
            }
            if (one === false) {
                all = false;
            }
        }
        for (let i = 0; i < this.divs.length; i++) {
            const index = this.getIndex(pervious[pervious.length - 1]);
            if (this.divs[i].row === index || this.divs[i].col === index) {

            }
        } 
    }
}