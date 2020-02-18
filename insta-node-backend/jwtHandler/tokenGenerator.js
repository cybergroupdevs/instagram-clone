const jwt = require("jsonwebtoken");
const fs   = require('fs');
const path = require('path');

module.exports = (payload) => {
    //var privateKEY  = fs.readFileSync(path.resolve("./jwtHandler/private.key"), 'utf8');
<<<<<<< HEAD
    const privateKEY = "ThisIsInstgramCloneMadeByInstaGangInHopeOfGettingTheirJobConfirmedPleasePrayForUs";
=======
    const privateKEY = "qmnwnmekjejohrfcgtlmknlkycxxdfxulkmnklnklnilkomncp";
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
    
    var i  = 'CyberGroup India Pvt. Ltd.';          // Issuer 
    var s  = 'User Auth';                           // Subject 
    var a  = 'someone@cygrp.com';                   // Audience
     
    const actualPayload = payload[0];

    // SIGNING OPTIONS
    var signOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "12h",
    algorithm:  "HS256"
    };

    try{
        var token = jwt.sign({data: actualPayload}, privateKEY, signOptions);
<<<<<<< HEAD
        console.log("Token - " + token)
        return token;
    }
    catch(e){
        console.log(e);
=======
        return token;
    }
    catch(e){
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
        return null;
    }
    
}   