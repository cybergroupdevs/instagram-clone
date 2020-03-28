const mongoose = require('mongoose');
const schema = require('../schemas');
const postSchema = new mongoose.Schema(schema.post);

class Post{
    constructor(){
        this.model = mongoose.model('Post', postSchema);
    }

    async get(criteria = {}, columns = {}){
        return this.model.findOne(criteria, columns);
    }

    async save(post){
        return this.model.create(post);
    }

    async log(criteria = {}, columns = {}){
        return this.model.find(criteria ,columns)
    }

    async modify(criteria, patchObj){
        return this.model.updateOne(criteria, { $set: patchObj });
    }

    async updateOne(criteria, newObj){
        return this.model.updateOne(criteria, newObj);
    }

    async findById(postObjectId){
        return this.model.findById(postObjectId);
    }
}
module.exports = new Post();