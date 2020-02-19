// // var express = require('express');
var multer  = require('multer');
var fs  = require('fs');

// // var storage = multer.diskStorage({
// //     destination: function (req, file, callback) {
// //         var dir = '../postsDb';
// //         if (!fs.existsSync(dir)){
// //             fs.mkdirSync(dir);
// //         }
// //         callback(null, dir);
// //     },
// //     filename: function (req, file, callback) {
// //         callback(null, file.originalname + '-' + Date.now());
// //         //appends the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC. to start of original file name
// //     }
// // });
// // let upload = multer({storage: storage});

class posts {
    constructor() { 
    }

    createNewPost(req, res){
        console.log(req.body);
        
        if (!req.file) {
            console.log("No file is available!");
            return res.send({
                success: false
            });
        } else {
            console.log('File is available!');
            
            return res.send({
                success: true
            });
        }
    }

//     // async createNewPost(req, res){
//     //     
//     //     await upload(req, res, function(err){
//     //         if(err){
//     //             res.send("Something went wrong");
//     //         }
//     //         else{
//     //             res.send("Upload Completed");
//     //         }
//     //     });
//     // }
}

module.exports = new posts();

// // app.post('/upload', function (req, res, next) {
// //     upload(req, res, function (err) {
// //         if (err) {
// //             return res.end("Something went wrong:(");
// //         }
// //         res.end("Upload completed.");
// //     });
// // })