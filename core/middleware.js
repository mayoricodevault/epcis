
let Jwt = require('./token');
const config = require('../config/config-app');

class Middleware{
    static verifityAuth (req , res ,next) {
        let token = req.headers['authorization'];
        const code = config.token.code;
        if (token) {
            if(token.startsWith(code)) {
                token = token.slice(code.length, token.length);
                console.log(token)
            }
            Jwt.verifityToken(token).then(()=>{
                next();
            }).catch((e)=>{
                return res.status(401).json(e);
            })

        } else {
            return res.status(401).json({
                success: false,
                message: 'Necesita autenticarce'
            });
        }
    }
}

module.exports=Middleware;