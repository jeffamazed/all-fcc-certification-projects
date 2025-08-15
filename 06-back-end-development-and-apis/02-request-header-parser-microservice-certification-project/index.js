// index.js
// where your node app starts

// init project
require("dotenv").config();
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// handle middleware
function handleMiddleware(req, res, next) {
  req.ipaddress = req.ip.replace(/^::ffff:/, "");
  req.language = req.headers["accept-language"];
  req.software = req.headers["user-agent"];
  next();
}

// middleware
app.use(handleMiddleware);

// your first API endpoint...
app.get("/api/whoami", (req, res) => {
  const ipaddress = req.ipaddress || null;
  const language = req.language || null;
  const software = req.software || null;

  res.json({
    ipaddress,
    language,
    software,
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
