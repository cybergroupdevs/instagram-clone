const mongoose = require('mongoose');
const schema = require('../schemas');
const followingSchema = mongoose.Schema(schema.following)

class Following{
    constructor(){
        this.model = mongoose.model('Following', followingSchema)
    }
    
    // async follow(followingObj){
    //     return await this.model.create(followingObj)
    // }

    // async unfollow(criteria={}){
    //     return await this.model.deleteOne(criteria)
    // }
    async create(followerObj){
        return await this.model.create(followerObj)
    }
    async delete(criteria={}){
        return await this.model.deleteOne(criteria)
    }

    async getRelation(criteria={}){
        return await this.model.findOne(criteria)
    }

}

module.exports = new Following();