class ParentItems {
    constructor(repo, schema){
        this.repo = repo;
        this.schema = schema;
    }

    list(){
        return this.repo.list(this.schema);
    }

    write(data){
        return this.repo.write(this.schema, data);
    }

    update(data){
        return this.repo.update(this.schema, data);
    }
}

module.exports = ParentItems;