const Url = require("../models/Url");

const composeUrl = require("../utils/compose_url");
const BASE_URL = process.env.BASE_URL;

async function checkDB(req, res, next) {
  const longUrl = req.body.bigUrl;
  console.log(
    "************************************** Checking in DB ***********************"
  );

  const doc = await Url.findOne({ longUrl });

  if (!doc) {
    console.log("Not Found in DB");
    return next();
  }
  const shortUrl = composeUrl(BASE_URL, doc.shortCode);

  res.send({
    bigUrl: longUrl,
    shortUrl,
  });
}

module.exports = checkDB;
