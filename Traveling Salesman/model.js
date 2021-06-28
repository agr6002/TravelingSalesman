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
        this.controller = this.app.controller;
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
            row = this.table.insertRow();
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
    }
    canCreateVillages() {
        this.goStatus += 1;
        let isAllNumbers = true;
        let numbers = [];
    
        for (let i = 0; i < this.divs.length; i++) {
            const text = this.divs[i].value;
            if (isNaN(text)) {
                this.divs[i].value = null;
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
            return true 
        }
    }
    createVillages() {
        this.table.parentNode.removeChild(this.table);
        this.view.can = document.createElement("canvas");
        this.view.can.height = this.controller.citiesDiv.clientHeight;
        this.view.can.width = this.controller.citiesDiv.clientWidth;
        this.controller.citiesDiv.appendChild(this.view.can);
        this.view.con = this.view.can.getContext("2d");
        const angle = 2 * Math.PI / this.cities;
        for (let i = 0; i < this.cities; i++) {
            this.citiesA.push(
                [
                this.view.can.width / 2 + (this.view.can.width / 2 - 40) * Math.cos(angle * i),
                this.view.can.height / 2 + (this.view.can.height / 2 - 40) * Math.sin(angle * i), 
                String.fromCharCode("A".charCodeAt(0) + i)
                ]
            );
        } 
        this.view.reDraw(0);
    }
    findCityByPos(x, y) {         
        let city  = this.citiesA[0];
        for (let i = 1; i < this.citiesA.length; i++) {
        const dx1 = city[0] - x;
        const dy1 = city[1] - y;
        const dx2 = this.citiesA[i][0] - x;
        const dy2 = this.citiesA[i][1] - y;
        if (Math.sqrt(dx1 * dx1 + dy1 * dy1) > Math.sqrt(dx2 * dx2 + dy2 * dy2)) {
            city = this.citiesA[i];
        }
        }
        return city;
    }
    getIndex(c) {
        let ind = -1;
        for (let i = 0; i  < this.cities; i++) {
            if (this.citiesA[i] == c) {
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
                        (this.divs[j].dataset.row == this.getIndex(c1) && this.divs[j].dataset.col == this.getIndex(c2))
                    || 
                        (this.divs[j].dataset.row == this.getIndex(c2) && this.divs[j].dataset.col == this.getIndex(c1))
                ) {
                return this.divs[j];
            }
        }
        console.log("error");
    }
    findPath() {
        const array = this.createCitiesArray();
        if (array.length > 2) {
            // for(let j = 0; j < array.length; j++) {
                let j = 0;
                let trinagle;
                let nums;
                if (j == array.length - 1) {
                    trinagle = [array[j], array[j +1], array[0]];
                    nums = [j, j+1, 0];
                } else if (j == array.length) {
                    trinagle = [array[j], array[0], array[1]];
                    nums = [j, 0, 1];
                } else {
                    trinagle = [array[j], array[j +1], array[j +2]];
                    nums = [j, j+1, j+2];
                }
                let nonNull = true;
                for (let k = 0; k < trinagle.length; k++) {
                    if (trinagle[k] === null) {
                        nonNull = flase;
                        console.log(false);
                    }
                }
                if (nonNull === true) {
                    console.log(trinagle);
                    let line1 = trinagle[0][Number(nums[1])];
                    let line2 = trinagle[1][Number(nums[2])];
                    let line3 = trinagle[2][Number(nums[0])];
                    if (Number(line1) + Number(line2) > Number(line3)) {
                        array[nums[2]][nums[0]] = null;
                        array[nums[0]][nums[2]] = null;                
                    } else if (Number(line2) + Number(line3) > Number(line1)) {
                        array[nums[1]][nums[2]] = null;
                        array[nums[2]][nums[1]] = null;
                    } else if (Number(line1) + Number(line3) > Number(line2)) {
                        array[nums[0]][nums[2]] = null;
                        array[nums[2]][nums[0]] = null;
                    }
                // }
            }
        }
    }
    createCitiesArray() {
        this.all = [];
        for (let i = 0; i < this.citiesA.length; i++) {
            let ar = [];
            let len = 0;
            for(let j = 0; j < this.divs.length; j++) {
                if (this.divs[j].value !== null ) {
                    if (Number(this.divs[j].dataset.col) === i) {
                        ar.push([Number(this.divs[j].value), this.divs[j].dataset.row]);
                        len += 1;
                    }
                    if (Number(this.divs[j].dataset.row) === i) {
                        ar.push([Number(this.divs[j].value), this.divs[j].dataset.col]);
                        len += 1;
                    }
                }
            }
            let newA = [];
            for (let l = 0; l < this.cities; l++){
                for (let k = 0; k < len; k++) {
                    if(Number(ar[k][1]) === l) {
                        newA.push(ar[k][0]);
                    }
                }
            }
            let a = [];
            a.push(this.citiesA[i]);
            a.push(newA);
            this.all.push(a);
        }
        console.log(this.all);
        return this.all
    }
}