const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports = (token) => {

<<<<<<< HEAD
    const privateKEY = "ThisIsInstgramCloneMadeByInstaGangInHopeOfGettingTheirJobConfirmedPleasePrayForUs";
=======
    const privateKEY = "qmnwnmekjejohrfcgtlmknlkycxxdfxulkmnklnklnilkomncp";
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4

    var i  = 'CyberGroup India Pvt. Ltd.';          // Issuer 
    var s  = 'User Auth';                           // Subject 
    var a  = 'someone@cygrp.com';                   // Audience
<<<<<<< HEAD
=======

>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
    var verifyOptions = {
        issuer:  i,
        subject:  s,
        audience:  a,
        expiresIn:  "12h",
        algorithm:  ["RS256"]
    };
<<<<<<< HEAD
    //const publicKEY  = fs.readFileSync('./public.key.txt', 'utf8');
    var legit = jwt.verify(token, publicKEY, verifyOptions);
    console.log("\nJWT verification result: " + JSON.stringify(legit));
=======

    //const publicKEY  = fs.readFileSync('./public.key.txt', 'utf8');

    try{
        return(jwt.verify(token, privateKEY, verifyOptions));
    }
    catch(error){
        return false;
    }
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
}