const mongoose = require('mongoose');
const schema = require('../schemas');
const followerSchema = mongoose.Schema(schema.follower)

class Suggestion{
    constructor(){
    }

    async getAll(criteria={}, columns={}){
        let fields = 'name instaHandle';
        let followerData = await this.model.find(criteria, columns);
        return (followerData);
    }
    
    
}

module.exports = new Suggestion();