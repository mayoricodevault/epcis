const request = require('request-promise');
const config = require('../config/config');
const Items = require('../schemas/items');
class Comunication{

    static getStates(){
        const options = {
            uri:config.request.states
        };
        request.get(options).then((resp)=>{
            let result = [];
            const response = JSON.parse(resp);
            for(let obj in response){
                result = [...result, ...response[obj]];
            }
            const items = Items();
            items.set(result).then((data)=>{
                console.log('result');
                console.log(data);
            });
        }).catch((e)=>{
            console.log('eeeeeee');
            console.log(e);
        });
    }
}

module.exports = Comunication;