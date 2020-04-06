const model = require("../models");
const jwtHandler = require("../jwtHandler");
const bcrypt = require("bcrypt");

class employee {
  constructor() {}

  async createUser(req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    try {
      let user = await model.user.get({ instaHandle: req.body.instaHandle });
      if (user[0] == null) {
        let userObject = {
          name: req.body.name,
          instaHandle: req.body.instaHandle,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password
        };
        console.log(userObject, "upto here");
        var instaUser = await model.user.save(userObject);
        let message = "user created";
        res.status(200).send({
          userObject
        });
        console.log(res, "response");
      } else {
        let message =
          "Sorry, something went wrong creating your account. Please try again soon.";
        res.status(406).send({
          success: false,
          message: message
        });
      }
    } catch (error) {
      console.log(error, "----->>> error");
      let message =
        "Sorry, something went wrong creating your account. Please try again soon.";

      res.status(406).send({
        success: false,
        message: message
      });
    }
  }

  async checkUserAuthentication(req, res) {
    let user = await model.user.get({
      $or: [{ instaHandle: req.body.instaHandle }, { email: req.body.email }]
    });
    //</expressionN> let user = await model.user.get({"instaHandle": req.body.instaHandle});
    if (user[0] != null) {
      let user = await model.user.get({
        $and: [
          {
            $or: [
              { instaHandle: req.body.instaHandle },
              { email: req.body.email }
            ]
          },
          { password: req.body.password }
        ]
      });
      if (user[0] != null) {
        let token = jwtHandler.tokenGenerator(user);
        if (token != null) {
          let resBody = {
            token: token
          };
          res.status(200).send(resBody);
        } else {
          console.log("Token is Null");
        }
      } else {
        let message =
          "Sorry, your password was incorrect. Please double-check your password.";
        res.status(401).send({
          success: false,
          message: message
        });
      }
    } else {
      let message =
        "The username you entered doesn't belong to an account. Please check your username and try again.";
      res.status(401).send({
        success: false,
        message: message
      });
    }
  }
}

module.exports = new employee();
