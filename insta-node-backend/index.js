const express = require('express');
const bodyParser = require('body-parser');
const config = require('./database/config');
var cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Why is this working and if I add, optionsSuccessStatus: 200, which was given as a solution to my problem, it was returning something but I was not able to get res.status ?
app.use(cors({origin: '*'}));

require("./routes/route.js")(app);

app.listen('8080', () => {
    console.log("-----------------Listening on port 8080-----------------");
});