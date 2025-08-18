// index.js
// where your node app starts

// init project
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

// get route for getting current date unix and utc
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;
  const regex = /^\d+$/;
  let date;

  // to check if no date param is provided
  if (!dateParam) {
    date = new Date();
    res.status(200).json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }

  // to check if the date param format is YYYY-MM-DD or unix format
  if (regex.test(dateParam)) {
    // handles unix format, convert to number first
    date = new Date(Number(dateParam));
  } else {
    // handles date string
    date = new Date(dateParam);
  }

  // to check if the date provided is invalid
  if (Number.isNaN(date.getTime())) {
    return res.status(400).json({ error: "Invalid Date" });
  } else {
    return res.status(200).json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
