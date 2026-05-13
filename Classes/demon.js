const Character = require("./Character");


class Demon extends Character {
    constructor(name, hp, attack) {
        super(name, hp, attack);
    }  
}

module.exports = Demon;