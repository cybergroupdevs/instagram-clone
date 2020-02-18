const mongoose = require('mongoose');
const schema = require('../schemas');
const userSchema = mongoose.Schema(schema.user);
class Operations{

    constructor(){
        this.model = mongoose.model('User', userSchema);
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
    async follow(criteria={}, updateObj){
        return this.model.update(criteria, updateObj )
    }

    async unfollow(criteria={}, updateObj){
        return this.model.update(criteria, updateObj )
    }
    async findOne(criteria={},columns={}){
        return this.model.findOne(criteria,columns)
    }
    async updateOne(criteria ={}, updateObj){
        return this.model.updateOne(criteria, updateObj);
    }
}
module.exports = new Operations();