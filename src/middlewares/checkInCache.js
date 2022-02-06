const client = require("../utils/setupRedis");
const composeUrl = require("../utils/compose_url");

const BASE_URL = process.env.BASE_URL;

async function checkInCache(req, res, next) {
  console.log("*********** Checking in Cache ************");
  const shortCode = req.params.shortCode;
  const code = composeUrl(BASE_URL, shortCode);

  let longUrl;

  try {
    longUrl = await client.get(code);
  } catch (err) {
    console.log("Something went wrong with your redis server");
    return next();
  }

  if (longUrl === null) {
    console.log("Not Found in Cache");
    return next();
  }

  res.status(301).redirect(longUrl);
}

module.exports = checkInCache;
