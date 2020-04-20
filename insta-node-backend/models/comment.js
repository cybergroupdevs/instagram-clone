const mongoose = require('mongoose');
const schema = require('../schemas');
const commentSchema = mongoose.Schema(schema.comment);
class Comment{

    constructor(){
        this.model = mongoose.model('Comment', commentSchema);
    }

    async get(criteria = {}, columns = {}){
        return this.model.findOne(criteria, columns);
    }

    async log(criteria = {}, columns = {}){
        let fields = 'instaHandle image';
        return await this.model.find(criteria, columns).sort({ 'createdAt': -1 }).populate('commentedBy', fields);
    }

    async save(commentObj){
        return await this.model.create(commentObj);
    }

    async updateOne(criteria, updateObj){
        return this.model.updateOne(criteria, updateObj);
    }

    async deleteOne(criteria){
        return this.model.deleteOne(criteria);
    }
}
module.exports = new Comment();