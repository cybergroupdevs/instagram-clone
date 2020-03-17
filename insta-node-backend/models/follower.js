const mongoose = require('mongoose');
const schema = require('../schemas');
const followerSchema = mongoose.Schema(schema.follower)

class Follower{
    constructor(){
        this.model = mongoose.model('Follower', followerSchema)
    }

    async getRelation(criteria={}){
        return await this.model.findOne(criteria)
    }

    async getAll(criteria={}, columns={}){
        let fields = 'profileImage about postsCount followers following name instaHandle';
        let followerData = await this.model.find(criteria, columns).populate('followerId', fields);
        return (JSON.stringify(followerData));
    }
    
    async create(followObj){
        return await this.model.create(followObj)
    }
    async delete(criteria={}){
        return await this.model.deleteOne(criteria)
    }
    
}

module.exports = new Follower();