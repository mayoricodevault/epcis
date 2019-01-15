var server = require('./server');
var repository = require('./repository/repository');
var config = require('./config/config');

console.log("--- Customer Service---");
console.log("Connecting to customer repository...");

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
        jobs:config.jobs
    });
}).then((app)=>{
    app.on('close', () => {
        repository.disconnect();
    });
});