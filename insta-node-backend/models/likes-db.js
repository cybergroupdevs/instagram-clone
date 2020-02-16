const mongoose = require('mongoose');
const schema = require('../schemas');
const postSchema = mongoose.Schema(schema.postLikes);
class Operations{

    constructor(){
        this.model = mongoose.model('postLike', postSchema);
    }

    async get(criteria={}, columns={}){
        return this.model.find(criteria, columns);
    }

    async save(employeeObj){
        return await this.model.create(employeeObj);
    }

    async update(criteria ={}, updateObj){
        return this.model.update(criteria, updateObj);
    }
}
module.exports = new Operations();