let jwt = require('jsonwebtoken');
let config = require('../config/config-app');

class JwtApp {

    static createdToken( email ){
        return jwt.sign(
            {
                email:email
            },
            config.token.secret,
            {
                expiresIn: config.token.expire
            }
        )
    }

    static verifityToken( token){
        return new Promise(( resolve, reject) => {
            jwt.verify(token, config.token.secret, (err, decoded) => {
                if (err) {
                    return reject({
                        success: false,
                        message: 'El token no es Valido'
                    })
                } else {
                    return resolve({
                        success: true,
                        message: 'El token es Valido'
                    });
                }
            });
        })
    }
}

module.exports = JwtApp;