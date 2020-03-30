const express = require("express");
const bodyParser = require("body-parser");
require("./database-config/config");
const fs = require("fs");
const path = require("path");
var cors = require("cors");
const app = express();

const authenticator = require("./middlewares/authentication");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file, "file inside destination");
    console.log(req.user.data.instaHandle, "instaHandle");
    const dir = `./uploads/${req.user.data.instaHandle}`;
    fs.exists(dir, exist => {
      if (!exist) return fs.mkdir(dir, error => cb(error, dir));

      return cb(null, `./uploads/${req.user.data.instaHandle}`);
    });
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) return cb(null, true);
    return cb("Error: Images Only");
  }
}).single("image");

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.patch("/api/file", [authenticator], (req, res) => {
  upload(req, res, error => {
    if (error) {
      return res.status(400).send({
        success: false,
        payload: {
          message: error
        }
      });
    }

    const file = req.file;
    console.log(req.file);
    if (!file) {
      const error = new Error("No File");
      return res.status(400).send({
        success: false,
        payload: {
          message: error
        }
      });
    }
    return res.send({
      success: true,
      payload: {
        data: {
          file
        },
        message: "File Uploaded Successfully!"
      }
    });
  });
});

require("./routes/route.js")(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`-----------------Listening on port ${port}-----------------`);
});
