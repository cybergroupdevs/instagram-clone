var express = require('express');
var multer  = require('multer');
var fs  = require('fs');

var app = express();
//app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, Date.now()+file.originalname);   
        //appends the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC. to start of original file name
    }
});
var upload = multer({storage: storage}).array('files', 12); //can upload a max of 12 files at once
app.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong:(");
        }
        res.end("Upload completed.");
    });
})

// app.get('/',function(req,res){
//     res.sendFile(__dirname + "/index.html");
// });

// app.post('/api/photo',function(req,res){
//   upload(req,res,function(err) {
//       if(err) {
//           return res.end("Error uploading file.");
//       }
//       res.end("File is uploaded");
//   });
// });

//app.listen(3000);
