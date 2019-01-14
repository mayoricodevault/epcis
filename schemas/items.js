const ParentItems = require("./parent-items");

let _model = null;
class Items extends ParentItems{
    static get instance(){
        return _model;
    }

    static set instance(schema){
        _model = schema;
    }

    constructor(db){
        super(db, 'items')
        this.db = db;
    }

    static getInstance(db=null){
        if(Items.instance){
            return Items.instance;
        }else{
            Items.instance = new Items(db);
            return Items.instance;
        }
    }
}

module.exports=(db)=>{
    return Items.getInstance(db);
};