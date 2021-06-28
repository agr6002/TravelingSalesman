const table = document.getElementById("cities-table");
const numberDiv = document.getElementById("number");
const divs = [];
let cities;
let goStatus = 0;
function up() {
    numberDiv.innerHTML = Number(numberDiv.innerHTML) + 1;
}
function down() {
    let num = numberDiv.innerHTML;
    if (Number(num) > 2) {
        numberDiv.innerHTML = Number(num) - 1;
    }
}
function go() {
    switch (goStatus) {
        case 0:
            createTable();
        break;
        case 1:
            createVillages();
        break;
    }
}

function createTable() {
    goStatus += 1;
    cities = Number(numberDiv.innerHTML);
    let row = table.insertRow();
    row.insertCell();

    for (let i = 0; i < cities; i++) {
        row.insertCell().innerHTML = String.fromCharCode("A".charCodeAt(0) + i);
    }

    for (let i = 0; i < cities; i++) {
        row = table.insertRow();
        row.insertCell().innerHTML = String.fromCharCode("A".charCodeAt(0) + i);

        for (let j = 0; j < cities; j++) {
            let cell = row.insertCell();
            if (j > i) {
                const it = document.createElement("input");
                it.setAttribute("type", "text");
                it.placeholder = "length between";
                // const it = document.createElement("div");
                // it.innerText = "length between";               
                // it.contentEditable = "true";
                it.dataset.row = i;
                it.dataset.col = j;
                it.classList.add("it");

                it.addEventListener("input", (e) => {
                    const rows = document.getElementById("cities-table").rows;
                    const row = e.target.dataset.row;
                    const col = e.target.dataset.col;
                    rows[Number(col) + 1].cells[Number(row) + 1].innerHTML = e.target.innerHTML;
                    // for (let div of divs) {
                    //     rows[Number(div.dataset.col) + 1].cells[Number(div.dataset.row) + 1].innerHTML = div.innerHTML;
                    // }
                });

                cell.appendChild(it);
                divs.push(it);

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

function createVillages() {
    goStatus += 1;
    let isAllNumbers = true;
    let numbers = [];

    for (let i = 0; i < divs.length; i++) {
        const text = divs[i].innerText;
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
        drawfirst()
    }
}

const citiesA = [];
let con, can;
function drawfirst() {
    table.parentNode.removeChild(table);
    can = document.createElement("canvas");
    can.height = document.getElementById("cities").clientHeight;
    can.width = document.getElementById("cities").clientWidth;
    document.getElementById("cities").appendChild(can);
    con = can.getContext("2d");

    const angle = 2 * Math.PI / cities;
    for (let i = 0; i < cities; i++) {
        let x = can.width / 2 + (can.width / 2 - 40) * Math.cos(angle * i);
        let y = can.height / 2 + (can.height / 2 - 40) * Math.sin(angle * i);
        //let x = Math.floor(Math.random() * can.width);
        //let y = Math.floor(Math.random() * can.height);
        citiesA.push([x, y, String.fromCharCode("A".charCodeAt(0) + i)]);
    }
    console.log(citiesA);
    for (let i  = 0; i < divs.length; i++) {
        let city1 = citiesA[divs[i].dataset.row];
        let city2 = citiesA[divs[i].dataset.col];
        con.beginPath();
        con.moveTo(city1[0], city1[1]);
        con.lineTo(city2[0], city2[1]);
        con.stroke();
        let cityX = city2[0];
        let cityY = city2[1];
        if (city1[0] < city2[0]) {
            cityX = city1[0];
        }
        if (city1[1] < city2[1]) {
            cityY = city1[1]; 
        }
        con.font = "20px Arial";
        const dx = city1[0] - city2[0];
        const dy = city1[1] - city2[1];
        const d = Math.sqrt(dy * dy + dx * dx);
        const angle = Math.atan2(dy, dx);
        con.fillText(divs[i].value, city2[0] + 0.25 * d * Math.cos(angle), city2[1] + 0.25 * d * Math.sin(angle)); //Math.abs(city1[0] - city2[0])/4  + cityX, Math.abs(city1[1] - city2[1])/4 + cityY);
        con.fillText(divs[i].value, city2[0] + 0.75 * d * Math.cos(angle), city2[1] + 0.75 * d * Math.sin(angle)); 
    }
    con.textAlign = "center";
    con.textBaseline = "middle";
    con.font = "15px Arial";
    for (let i = 0; i < cities; i++) {
        con.fillStyle = "black";
        if (i == 0) {
            con.fillStyle = "red";
        }
        con.beginPath();
        con.arc(citiesA[i][0], citiesA[i][1], 15, 0, 2 * Math.PI);
        con.fill();
        con.fillStyle = "white";
        console.log(i, String.fromCharCode("A".charCodeAt(0) + i));
        con.fillText(String.fromCharCode("A".charCodeAt(0) + i), citiesA[i][0], citiesA[i][1]);
    }
    can.addEventListener("click", clicked);
}
function reDraw(on, beenToC, lines) {
    con.clearRect(0, 0, can.width, can.height);
}
function drawlines(lines) {
    for (let i  = 0; i < divs.length; i++) {
        con.strokeStyle = "black";
        let city1 = citiesA[divs[i].dataset.row];
        let city2 = citiesA[divs[i].dataset.col];
        for (let j = 0; j < lines.length; j++) {
            if (lines[j][1] == city1 && lines[j][0] == city2) {
                con.strokeStyle = "blue";
            }
        }
        con.beginPath();
        con.moveTo(city1[0], city1[1]);
        con.lineTo(city2[0], city2[1]);
        con.stroke();
        con.font = "20px Arial";
        const dx = city1[0] - city2[0];
        const dy = city1[1] - city2[1];
        const d = Math.sqrt(dy * dy + dx * dx);
        const angle = Math.atan2(dy, dx);
        con.fillStyle = "black";
        con.fillText(divs[i].value, city2[0] + 0.25 * d * Math.cos(angle), city2[1] + 0.25 * d * Math.sin(angle));
        con.fillText(divs[i].value, city2[0] + 0.75 * d * Math.cos(angle), city2[1] + 0.75 * d * Math.sin(angle)); 
    }
}
function drawCirles(on, beenToC) {
    con.textAlign = "center";
    con.textBaseline = "middle";
    con.font = "15px Arial";
    for (let i = 0; i < cities; i++) {
        con.fillStyle = "black";
        console.log("black" + i);
        if (i == on) {
            con.fillStyle = "red";
            console.log("red" + i);
        }
        for (let j = 0; j < beenToC.length; j++) {
            if (beenToC[j] == cities[i]) {
                con.fillStyle = "blue";                
            }
        }
        con.beginPath();
        con.arc(citiesA[i][0], citiesA[i][1], 15, 0, 2 * Math.PI);
        con.fill();
        con.fillStyle = "white";
        con.fillText(String.fromCharCode("A".charCodeAt(0) + i), citiesA[i][0], citiesA[i][1]);
    }
}
function findCityByPos(x, y) {         
    let city  = citiesA[0];
    for (let i = 1; i < citiesA.length; i++) {
    const dx1 = city[0] - x;
    const dy1 = city[1] - y;
    const dx2 = citiesA[i][0] - x;
    const dy2 = citiesA[i][1] - y;
    if (Math.sqrt(dx1 * dx1 + dy1 * dy1) > Math.sqrt(dx2 * dx2 + dy2 * dy2)) {
        city = citiesA[i];
    }
    }
    return city;
}
function getIndex(c) {
    let ind = -1;
    for (let i = 0; i  < cities; i++) {
        if (citiesA[i] == c) {
            ind = i;
        }
    }
    if (ind !== -1) {
        return ind;
    }
}

let first = null;
function clicked(e) {
    console.log("click");
    const cities = [];
    const lines = [];
    if (first == null) {
        console.log("first");
        first = {
            x: e.clientX,
            y: e.clientY
        };  
    }
    else {
        console.log("second");
        const c1 = findCityByPos(first.x, first.y);
        const c2 = findCityByPos(e.clientX, e.clientY);
        reDraw(getIndex(c2), cities.push(c2), lines.push([c1, c2]));
        first = null;
    }
}