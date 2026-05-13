class Item {
    constructor(id, name, desc, type) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.type = type;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getDesc() {
        return this.desc;
    }

    getType() {
        return this.type;
    }
}

module.exports = Item;