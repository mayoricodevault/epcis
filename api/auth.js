
let parentRouter = require('../core/parent.router');
let User = require('../schemas/users');
let Jwt = require('../core/token');
class Auth extends parentRouter{

    get routes(){
        return{
            'post /login' : 'login',
            'post /register' :'register'
        }
    }

    constructor(router){
        super(router);
        // this.Model = User.getInstance()
    }

    list(req, res){

    }

    login ( req, res) {
        const body = req.body;
        const SchemaUser = User();

        if(!body.email){
            this.error(res,'Correo no definido');
        }
        if(!body.password){
            this.error(res,'Password no definido');
        }

        return SchemaUser.findAll({
            where: body
        }).then((users) => {
            if ( users.length > 0 ) {
                console.log('asdasdadas')
                const token = Jwt.createdToken(body.email);
                return res.json({
                    token : token,
                    msg : 'Usuario autentificado',
                    code: 'Bearer'
                });
            } else {
                this.error( res, 'Correo o Password Invalida');
            }

        }).catch((e) => {
            this.handleError(res)(e);
        });
    }

    register ( req, res) {
        const body = req.body;
        const SchemaUser = User();

        if(!body.email){
            this.error(res,'Correo no definido');
        }
        if(!body.password){
            this.error(res,'Password no definido');
        }


        SchemaUser.findAll({
            where: {
                email:body.email
            }
        }).then((users) => {
            if ( users.length > 0 ) {
                this.error( res, `El correo ${body.email} esta ya fue registrado`);
            } else {
                SchemaUser.create(body).then((response)=>{
                    return res.json(response);
                }).catch((e)=>{
                    this.handleError(res)(e);

                });
            }

        }).catch((e) => {
            this.handleError(res)(e);
        });
    }

    error(res, msg) {
        this.handleError(res)({
            msg: msg
        })
    }
}

module.exports = Auth;