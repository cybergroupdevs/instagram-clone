const mongoose = require('mongoose');
const schema = require('../schemas');
const followingSchema = mongoose.Schema(schema.following)

class Following{
    constructor(){
        this.model = mongoose.model('Following', followingSchema)
    }

    async getAll(criteria={}, coloumns={}){
        let fields = 'name instaHandle';
        let followingData = await this.model.find(criteria, coloumns).populate('followingId', fields);
        return (followingData);
    }
    
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