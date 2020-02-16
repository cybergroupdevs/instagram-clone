const userDb = require("./user-db");
const likeDb = require("./likes-db");
module.exports = {
    user: userDb,
    likes: likeDb
}