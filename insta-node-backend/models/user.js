const mongoose = require('mongoose');
const schema = require('../schemas');
const userSchema = mongoose.Schema(schema.user);
const bcrypt = require("bcrypt");
class Operations{

    constructor(){
        this.model = mongoose.model('User', userSchema);
    }

    async get(criteria={}, columns={}){
        return this.model.find(criteria, columns).select("-password");
    }

    async getOne(criteria = {}, columns = {}){
        return this.model.findOne(criteria, columns).select("-password");
    }

    async save(userObj){
        return this.model.create(userObj);
    }

    async update(criteria ={}, updateObj){
        return this.model.updateOne(criteria, updateObj);
    }

    async checkPassword(criteria={}, enteredPassword){
        let user = await this.model.findOne(criteria)
        const match = await bcrypt.compare(enteredPassword, user.password);


        return match
    }
    // async follow(criteria={}, updateObj){
    //     return this.model.update(criteria, updateObj )
    // }

    // async unfollow(criteria={}, updateObj){
    //     return this.model.update(criteria, updateObj )
    // }
    
    // async get(criteria={},columns={}){
    //     return this.model.findOne(criteria,columns)
    // }
    // async updateOne(criteria ={}, updateObj){
    //     return this.model.updateOne(criteria, updateObj);
    // }

    async delete(criteria={}){ //delete is not any method! remove/deleteOne/deleteMany are ---@author<Himanshu Sharma>
        return this.model.delete(criteria);
    }
}
module.exports = new Operations();