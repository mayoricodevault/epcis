var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var Items = require('./api/items');
// var Middleware=require('./core/middleware')

module.exports.start = (options) => {

  return new Promise((resolve, reject) => {

    let app = express();
    let ModelItems= new Items(express.Router(),options.db);

    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    //  Add the APIs to the app.
    app.use('/items',ModelItems.router);
    let server = app.listen(options.port, () => {
      resolve(server);
    });

  });

};