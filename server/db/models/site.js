const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  siteName: {
    type: String,
  },
  siteUrl: {
    type: String,
  },
  siteSearchUrl: {
    type: String,
  },
  siteLogoUrl: {
    type: String,
  },
  containerSelector: {
    type: String,
  },
  itemSelector: {
    type: String,
  },
  imageSelector: {
    type: String,
  },
  titleSelector: {
    type: String,
  },
  authorSelector: {
    type: String,
  },
  priceSelector: {
    type: String,
  },
  availabelSelector: {
    type: String,
  },
  bookUrlSelector: {
    type: String,
  },
});

const Site = mongoose.model("Site", siteSchema);

module.exports = Site;
