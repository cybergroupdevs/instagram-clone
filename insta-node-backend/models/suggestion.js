const mongoose = require('mongoose');
const schema = require('../schemas');
const followerSchema = mongoose.Schema(schema.follower)

class Suggestion{
    constructor(){
    }

    async log(criteria={},columns={}){
        return this.model.find(criteria,columns);
      }
    
    
}

module.exports = new Suggestion();