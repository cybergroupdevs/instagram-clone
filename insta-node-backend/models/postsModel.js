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
}
module.exports = new Operations();