require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dns = require("dns");
const app = express();
// Basic Configuration
const port = process.env.PORT || 3000;

// short url counter
let shortUrlCounter = 1;
const urlCollection = {
  1: "https://github.com/jeffamazed",
};

app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));
// body parser
const URLEncodedMiddleWare = bodyParser.urlencoded({ extended: false });
app.use(URLEncodedMiddleWare);

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// post route for /api/shorturl
app.post("/api/shorturl", (req, res) => {
  const { url } = req.body;

  try {
    newUrl = new URL(url);
  } catch (err) {
    console.error(err);
    return res.status(200).json({ error: "invalid url" });
  }

  // dns lookup
  dns.lookup(newUrl.hostname, (err) => {
    if (err) {
      return res.status(200).json({ error: "invalid url" });
    }

    const existingId = Object.keys(urlCollection).find(
      (key) => urlCollection[key] === url,
    );

    if (existingId) {
      return res
        .status(200)
        .json({ original_url: url, short_url: Number(existingId) });
    }

    shortUrlCounter++;
    urlCollection[shortUrlCounter] = url;

    res.status(200).json({ original_url: url, short_url: shortUrlCounter });
  });
});

app.get("/api/shorturl/:counter", (req, res) => {
  const { counter } = req.params;
  const originalUrl = urlCollection[Number(counter)];

  if (!originalUrl) return res.status(404).send("<h1>URL is not found</h1>");
  res.redirect(originalUrl);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
