const express = require("express");
const router = express.Router();

const Url = require("../models/Url");
const checkInCache = require("../middlewares/checkInCache");

router.get("/:shortCode", checkInCache, async (req, res) => {
  const shortCode = req.params.shortCode;

  try {
    console.log("Finding in DB");
    const url = await Url.findOne({ shortCode });
    console.log("Got in DB", url);

    if (!url) {
      return res.status(404).send({
        message: "URL not found",
      });
    }

    // Permanent Redirect
    res.status(301).redirect(url.longUrl);
  } catch {
    res.status(503).send({
      message: "Service is down",
    });
  }
});

module.exports = router;
