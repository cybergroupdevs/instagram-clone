const model = require("../models");
class Suggestion {
    constructor() {}
    async index(req, res) {
        // console.log("dikhaa rha huu");
         const employeeList = await model.employee.log(
           {},
           { name: 1, designation: 1, role: 1, email: 1, phone: 1, empId: 1 }
         );
         res.send(employeeList);
         console.log(employeeList);
       }
}  
module.exports=new Suggestion();