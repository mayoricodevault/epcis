const schedule = require('node-schedule');

class JobRequest {

    constructor(timer){
        this.timer = timer;
        this.schedule = null;
    }

    run(cb){
        this.schedule = schedule.scheduleJob(this.timer, (fireDate)=>{
            cb();
        });
    }

    cancel(){
        this.schedule.cancel();
    }
}

module.exports = JobRequest;