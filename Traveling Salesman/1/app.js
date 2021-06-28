import {Model} from "./model.js"
import {View} from "./view.js"
import {Controller} from "./controller.js"
export class App {
    constructor() {
        this.model = new Model(this);
        this.view = new View(this);
        this.controller = new Controller(this);
        this.call();
    }
    call() {
        this.initalize();
    }
    initalize() {
        this.model.initalize();
        this.view.initalize();
        this.controller.initalize();
    }
}