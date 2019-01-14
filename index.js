//	index.js
//
//  Entrypoint to the application. Opens a repository to the MySQL
//  server and starts the server.
var server = require('./server');
var repository = require('./repository/repository');
var config = require('./config/config-app');

//  Lots of verbose logging when we're starting up...
console.log("--- Customer Service---");
console.log("Connecting to customer repository...");

//  Log unhandled exceptions.
process.on('uncaughtException', function(err) {
  console.error('Unhandled Exception', err);
});
process.on('unhandledRejection', function(err, promise){
  console.error('Unhandled Rejection', err);
});

repository.connect({
    nameDb:config.db.database,
    schemas:config.db.schemas
}).then((repo) => {
    return server.start({
      port: config.port,
      db: repo,
    });
}).then((app)=>{
    app.on('close', () => {
        repository.disconnect();
    });
});