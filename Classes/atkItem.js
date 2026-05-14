const Item  = require('./item.js');

class AtkItem extends Item {
    constructor(id, name, description, type = 'Atk', damage) {
        super(id, name, description, type);
        this.damage = damage;
    }

    getDamage() {
        return this.damage;
    }
}

module.exports = AtkItem;