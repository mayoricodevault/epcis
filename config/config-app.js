//  config.js
//
//  Simple application configuration. Extend as needed.
module.exports = {
    token:{
        secret: 'dia0',
        expire: '1h',
        code : 'Bearer '
    },

    port: process.env.PORT || 3000,
    db: {
        database: 'logs.json',
        schemas:{
            items:[]
        }
    },
    'ports' : {
        'http' : 3000
    }
};
