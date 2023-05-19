const express = require("express");
const Site = require("../models/site");
const router = new express.Router();

router.get("/site", async (req, res) => {
  try {
    const sites = await Site.find({});
    res.send(sites);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/info", async (req, res) => {
  try {
    const sites = await Site.find({});
    const info = sites.map((site) => {
      return {
        siteName: site.siteName,
        siteUrl: site.siteUrl,
        siteLogoUrl: site.siteLogoUrl
      }
    });
    res.send(info);
  } catch (e) {
    res.status(500).send();
  }
});

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

router.put("/site", async (req, res) => {
  try {
    const { productsToUpdateArray = null } = req.body;

    if (productsToUpdateArray) {
      productsToUpdateArray.map(async (site) => {
        await Site.updateOne({ _id: site._id }, site);
      });
    } else {
      const site = req.body;
      await Site.updateOne({ _id: site._id }, site);
    }

    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/site", async (req, res) => {
  try {
    const sitesToDelete = req.body.ids;
    // const productsToDelete = await Site.find({code: codesToDelete})
    await Site.deleteMany({ _id: sitesToDelete });
    // console.log(productsToDelete)

    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
