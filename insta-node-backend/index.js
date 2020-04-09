const express = require("express");
const bodyParser = require("body-parser");
require("./database-config/config");
var cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));

app.use(express.static('uploads/shivani_'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/route.js")(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`-----------------Listening on port ${port}-----------------`);
});
