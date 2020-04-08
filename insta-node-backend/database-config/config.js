const mongoose = require("mongoose");
const url = "mongodb://localhost:127.0.0.1:27017/instaDB";
// const url = "mongodb+srv://faizan:faizan20@instagram-clone-bddy7.mongodb.net/instaDB?retryWrites=true&w=majority"


mongoose.Promise = global.Promise;

mongoose
  .connect(url, { useNewUrlParser: true, keepAlive: 1, useUnifiedTopology: true })
  .then(res => {
    console.log("Connection Established");
  })
  .catch(error => {
    console.log('Error: '+error.message);
  });
module.exports = mongoose;
