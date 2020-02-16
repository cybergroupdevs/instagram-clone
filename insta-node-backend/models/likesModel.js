const mongoose = require('mongoose');
const schema = require('../schemas');
const likeSchema = mongoose.Schema(schema.likes);
class Operations{

    constructor(){
        this.model = mongoose.model('postLike', likeSchema);
    }

    async get(criteria={}, columns={}){
        return this.model.find(criteria, columns);
    }

    async save(employeeObj){
        return await this.model.create(likeObj);
    }

    async update(criteria ={}, updateObj){
        return this.model.update(criteria, updateObj);
    }
}
module.exports = new Operations();