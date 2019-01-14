class ParentRouter {

    get defaultRoute(){
        return {
            '/'         : 'getData',
            'POST /'    : 'create',
            'PUT /'     : 'update',
            'DELETE /:id'  : 'remove'
        }
    }

    get routes(){
        return {}
    }

    constructor(router,Model=null,config = {}){
        this.router=router;
        this.Model=Model;
        this._config =config;
        this.default={};
        if (!this.router) throw new Error('Missing app property');
        this.default = Model ? this.defaultRoute:{}
        this.registerRoutes();
    }

    registerRoutes() {
        let routes = Object.assign({},this.default,this.routes);

        Object.keys(routes).forEach((path) => {
            let method = routes[path];
            let verb = path.split(' ').length > 1 ? path.split(' ')[0] : 'get';
            let newPath = path.split(' ').length > 1 ? path.split(' ')[1] : path;
            verb = verb.toLowerCase();
            this.router[verb](newPath, this[method].bind(this));
        });
    }

    getData(req,res) {
        let key=req.query.key;
        let value=req.query.value;
        this.Model.list().then((response) => {
            return res.json(response);
        });
    }

    create(req,res){
        let body= req.body;
        this.Model.write(body).then((response) => {
            return res.json(response);
        });
    }

    update(req,res){
        let body = req.body;
        let id = body.id;
        delete body.id;
        let query = {
            update: body,
            id:id
        };

        this.Model.update(query).then((resp) =>{
            return res.json(resp);
        }).catch((e)=>{
            this.handleError(res)(e);
        });
    }

    remove(req,res){

        // this.Model.destroy({
        //     where:{
        //         id :req.params.id
        //     }
        // }).then((resp) =>{
        //     return res.json(resp);
        // }).catch((e)=>{
        //     this.handleError(res)(e);
        // });
    }

    handleError(res) {
        return function(error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = ParentRouter;

