const Item = require('./item.js');

class DefItem extends Item {
    constructor(id, name, description, type = 'Def', defense) {
        super(id, name, description, type);
        this.defense = defense;
    } 
    
    getDefense() {
        return this.defense;
    }
}

module.exports = DefItem;