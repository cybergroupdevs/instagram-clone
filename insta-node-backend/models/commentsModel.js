const mongoose = require('mongoose');
const schema = require('../schemas');
const commentSchema = mongoose.Schema(schema.comments);
class Operations{

    constructor(){
        this.model = mongoose.model('postComment', commentSchema);
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