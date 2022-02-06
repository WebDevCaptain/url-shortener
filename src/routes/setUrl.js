const express = require("express");
const validUrl = require("valid-url");

const Url = require("../models/Url");
const composeUrl = require("../utils/compose_url");
const client = require("../utils/setupRedis");
const checkDB = require("../middlewares/checkDB");
const { encodeURL } = require("../utils/encode_url");
// const { nanoid } = require("nanoid");
const BASE_URL = process.env.BASE_URL;

let theta = 0;

const router = express.Router();

router.post("/url", checkDB, async (req, res) => {
  const longUrl = req.body.bigUrl;

  if (!longUrl) {
    return res.status(400).send({
      message: "A long URL is required",
    });
  }

  const valid = validUrl.isUri(longUrl);

  if (!valid) {
    return res.status(400).send({
      message: "Invalid big URL provided",
    });
  }

  try {
    let shortCode = encodeURL(theta++);
    // let shortCode = await nanoid(8);

    let doc = new Url({
      shortCode,
      longUrl,
    });

    try {
      // 1st time success
      await doc.save();
    } catch {
      // Retry in case of shortCode collision
      // shortCode = await nanoid(8);

      // doc = new Url({
      //   shortCode,
      //   longUrl,
      // });

      // await doc.save();
      return res.status(500).send({
        message: "There is something wrong with our servers",
      });
    }

    const shortUrl = composeUrl(BASE_URL, doc.shortCode);

    // Storing data in Redis cache
    if (client) {
      await client.set(shortUrl, doc.longUrl);
    }

    res.send({
      bigUrl: doc.longUrl,
      shortUrl,
    });
  } catch (err) {
    console.log("Error *******", err);

    res.status(500).send({
      message: "An error occurred...",
    });
  }
});

module.exports = router;
