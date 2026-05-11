class character {
    constructor(name, hp, attack) {
        this.name = name;
        this.hp = hp;
        this.attack = attack;
    }

    getName() {
        return this.name;
    }

    getHp() {
        return this.hp;
    }

    getAttack() {
        return this.attack;
    }

}

module.exports = character;