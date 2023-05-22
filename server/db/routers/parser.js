const express = require("express");
const Site = require("../models/site");
const router = new express.Router();
const cheerio = require("cheerio");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

router.post("/search", async (req, res) => {
  const { search } = req.body;
  const sites = await Site.find({});

  try {
    function fetchSearchResults(searchTerm, site) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`${site.siteSearchUrl}${searchTerm}`);
          const data = await response.text();
          const $ = cheerio.load(data);

          const parent = $(site.containerSelector);
          const card = parent.children(site.itemSelector).first();

          const image = $(card).find(site.imageSelector).first().attr("src");
          const dataImg = $(card).find(site.imageSelector).first().attr("data-src");

          let imgUrl;
          if (dataImg) {
            imgUrl = dataImg;
          } else {
            imgUrl = image;
          }

          const title = $(card).find(site.titleSelector).first().text();
          const author = $(card).find(site.authorSelector).first().text();
          const price = $(card).find(site.priceSelector).first().text();
          const available = $(card).find(site.availabelSelector).first().text();
          const bookUrl = $(card)
            .find(site.bookUrlSelector)
            .first()
            .attr("href");

          const parsePrice = (string) => {
            return string
              .replace(/ /g, "")
              .replace("грн.", "")
              .replace("грн", "")
              .replace("₴", "")
              .trim();
          };

          if (Boolean(title)) {
            resolve({
              source: site.siteName,
              image: imgUrl?.includes("http")
                ? imgUrl
                : `${site.siteUrl}${imgUrl}`,
              title,
              author,
              price: parsePrice(price),
              available: available || "В наявності",
              bookUrl: bookUrl?.includes("http")
                ? bookUrl
                : `${site.siteUrl}${bookUrl}`,
            });
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      });
    }

    function startSearch() {
      const promises = sites.map((site) => fetchSearchResults(search, site));
      return Promise.all(promises);
    }

    const results = await startSearch();

    res.status(200).send({ results });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
