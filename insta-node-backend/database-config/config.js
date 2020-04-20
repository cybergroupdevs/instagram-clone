//mongoose is a wrapper of mongodb
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/instaDB"


mongoose.Promise = global.Promise;

mongoose
  .connect(url, { useNewUrlParser: true, keepAlive: 1, useUnifiedTopology: true })
  .then(res => {
  })
  .catch(error => {
  });
module.exports = mongoose;
