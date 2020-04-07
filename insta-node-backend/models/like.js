const mongoose = require('mongoose');
const schema = require('../schemas');
const likeSchema = mongoose.Schema(schema.like);
class Like{

    constructor(){
        this.model = mongoose.model('Like', likeSchema);
    }

    async get(criteria = {}, columns = {}){
        
        return this.model.findOne(criteria, columns);
    }

    async log(criteria = {}, columns={}){
        let fields = 'instaHandle';
        return this.model.find(criteria, columns).sort({ 'createdAt': -1 }).populate('likedBy', fields);
    }

    async save(likeObj){
        console.log(likeObj);
        return this.model.create(likeObj);
    }

    async updateOne(criteria = {}, updateObj){
        return this.model.updateOne(criteria, updateObj);
    }

    async deleteOne(criteria){
        return this.model.deleteOne(criteria);
    }
}
module.exports = new Like();