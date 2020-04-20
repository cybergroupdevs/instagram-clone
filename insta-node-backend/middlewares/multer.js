var multer  = require('multer');

var fileName;
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        var dir = `../user/${req.user.instaHandle}`;
        callback(null, dir);
    },
    filename: (req, file, callback) => {
        fileName = `${file.originalname}-${Date.now()}`;
        callback(null, fileName);
    }
});

const multerConfig = {
    storage: multer.diskStorage({
     //Setup where the user's file will go
     destination: function(req, file, next){
       next(null, './public/photo-storage');
       },   
        
        //Then give the file a unique name
        filename: function(req, file, next){
            
            const ext = file.mimetype.split('/')[1];
            next(null, file.fieldname + '-' + Date.now() + '.'+ext);
          }
        }),   
        
        //A means of ensuring only images are uploaded. 
        fileFilter: function(req, file, next){
              if(!file){
                next();
              }
            const image = file.mimetype.startsWith('image/');
            if(image){
              next(null, true);
            }else{
              
              //TODO:  A better message response to user on failure.
              return next();
            }
        }
      };

let upload = multer({storage: storage});

