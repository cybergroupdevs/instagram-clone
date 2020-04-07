const jwt = require("jsonwebtoken");
const fs   = require('fs');
const path = require('path');

module.exports = (payload) => {
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
        var token = jwt.sign({data: actualPayload}, 'secretkey', signOptions);
        return token;
    }
    catch(e){
        return null;
    }
    
}   