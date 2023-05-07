const express = require("express");
const Site = require("../models/site");
const router = new express.Router();

router.post("/site", async (req, res) => {
  const site = new Site(req.body);

  try {
    await site.save();
    res.status(201).send(site);
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

router.get("/site", async (req, res) => {
  try {
    const sites = await Site.find({});
    res.send(sites);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
