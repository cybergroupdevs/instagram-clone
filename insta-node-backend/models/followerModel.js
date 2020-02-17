const mongoose = require('mongoose');
const schema = require('../schemas');
const followerSchema = mongoose.Schema(schema.follower)

class Follower{
    constructor(){
        this.model = mongoose.model('Follower', followerSchema)
    }
    
    async follow(followerObj){
        return await this.model.create(followerObj)
    }

    async unfollow(criteria={}){
        return await this.model.deleteOne(criteria)
    }

}

module.exports = new Follower();