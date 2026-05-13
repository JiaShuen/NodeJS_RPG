const Character = require("./Character");

class Hero extends Character {
    constructor(name, hp, attack, items = []) {
        super(name, hp, attack);
        this.items = items;
    }  

    getItems() {
        return this.items;
    }
}

module.exports = Hero;