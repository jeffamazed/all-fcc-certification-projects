const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "upload/" });
require("dotenv").config();

const app = express();

// multer setup
const uploadMiddleware = upload.fields([{ name: "upfile", maxCount: 1 }]);

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// post /api/fileanalyse
app.post("/api/fileanalyse", uploadMiddleware, (req, res) => {
  const upfile = req.files?.["upfile"]?.[0];

  if (!upfile) {
    return res.status(400).json({ message: "Must provide a file." });
  }

  const { originalname: name, mimetype: type, size } = upfile;
  res.status(201).json({ name, type, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
