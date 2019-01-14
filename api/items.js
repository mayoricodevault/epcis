
let parentRouter = require('../core/parent.router');
let Item= require('../schemas/items');

class Items extends parentRouter {

    get routes() {
        return {}
    }

    constructor(router, db) {
        super(router, Item(db));
    }
}
module.exports = Items;