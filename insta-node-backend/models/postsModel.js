const mongoose = require('mongoose');
const schema = require('../schemas');
const postSchema = mongoose.Schema(schema.post);
class Operations{

    constructor(){
        this.model = mongoose.model('Post', postSchema);
    }
    async get(criteria={}, columns={}){
        return await this.model.find(criteria, columns);
    }

    async save(postObj){
        return await this.model.create(postObj);
    }
    async findOne(criteria={},columns={}){
        return this.model.findOne(criteria,columns)
    }
    async updateOne(criteria ={}, updateObj){
        return this.model.updateOne(criteria, updateObj);
    }
}
module.exports = new Operations();