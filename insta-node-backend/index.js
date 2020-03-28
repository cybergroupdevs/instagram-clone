const express = require('express');
const bodyParser = require('body-parser');
require('./database-config/config');
var cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors({origin: '*'}));

require("./routes/route.js")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`-----------------Listening on port ${port}-----------------`);
});