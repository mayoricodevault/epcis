const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

class Repository {
  constructor(connectionSettings) {
      this.adapter = new FileSync(connectionSettings.nameDb || 'logsDb.json');
      this.db = low(this.adapter);
      this.db
          .defaults(connectionSettings.schemas)
          .write();
  }

  set(schema, data){
      return new Promise((res, rej)=>{
          return res(
              this.db
                  .set(schema,data)
                  .write()
          )
      })
  }

  read() {
      return new Promise((res, rej)=>{
          return res(
              this.db
                  .getState()
          )
      })
  }

  list(schema, data = null){
      return new Promise((res, rej)=>{
          return res(
              this.db
                .get(schema)
                .value()
          )
      })

  }

  write(schema ,data){
      data.id = this.guid();
      data.createdAt = Date.now();
      return new Promise((res, rej)=>{
          return res(
              this.db.get(schema)
                  .unshift(data)
                  .write()
          )
      });
  }

  update(schema ,data){

      return new Promise((res, rej)=>{
          return res(
              this.db.get(schema)
                  .find({
                      id: parseInt(data.id)
                  })
                  .assign(data.update)
                  .write()
          )
      });

  }

  guid() {
      function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
      }
      return `${s4()}-${s4()}`
  }
}
module.exports.connect = connectionSettings => {
  return new Promise((resolve, reject) => {
    if (!connectionSettings.nameDb) throw new Error("A name database must be specified.");
    if (!connectionSettings.schemas) throw new Error("A schemas must be specified.");

    resolve(new Repository(connectionSettings));
  });
};
