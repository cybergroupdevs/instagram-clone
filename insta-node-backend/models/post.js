const mongoose = require('mongoose');
const schema = require('../schemas');
const postSchema = new mongoose.Schema(schema.post);

class Post{
    constructor(){
        this.model = mongoose.model('Post', postSchema);
    }

    async get(criteria = {}, columns = {}){
        let fields = "image instaHandle"
        return await this.model.findOne(criteria, columns).populate("user", fields);

    }

    async save(post){
        return this.model.create(post);
    }

    async index(criteria = {}, columns = {}){
        let fields = 'instaHandle image';
        return this.model.find(criteria ,columns).sort({ 'createdAt': -1 }).populate('user', fields);
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