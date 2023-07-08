const express = require("express");
const Site = require("../models/site");
const router = new express.Router();
const multer = require("multer"); // For handling file uploads
const fs = require("fs");
const { createObjectCsvWriter } = require("csv-writer");
const xlsx = require("xlsx");
const { parseXls, parseCsv } = require("../functions/parsers");

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
        siteLogoUrl: site.siteLogoUrl,
      };
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
    await Site.deleteMany({ _id: sitesToDelete });

    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/export", async (req, res) => {
  const { type } = req.body;
  const data = await Site.find({});

  if (type === "csv") {
    // Define CSV writer and column headers
    const csvWriter = createObjectCsvWriter({
      path: "data.csv",
      header: [
        { id: "_id", title: "_id" },
        { id: "siteName", title: "siteName" },
        { id: "siteUrl", title: "siteUrl" },
        { id: "siteSearchUrl", title: "siteSearchUrl" },
        { id: "containerSelector", title: "containerSelector" },
        { id: "itemSelector", title: "itemSelector" },
        { id: "imageSelector", title: "imageSelector" },
        { id: "titleSelector", title: "titleSelector" },
        { id: "authorSelector", title: "authorSelector" },
        { id: "priceSelector", title: "priceSelector" },
        { id: "availabelSelector", title: "availabelSelector" },
        { id: "__v", title: "__v" },
        { id: "bookUrlSelector", title: "bookUrlSelector" },
        { id: "siteLogoUrl", title: "siteLogoUrl" },
      ],
      fieldDelimiter: ";",
    });

    // Write data to CSV file
    csvWriter
      .writeRecords(data)
      .then(() => {
        console.log("CSV file created successfully");

        res.setHeader("Content-Type", "text/csv");

        res.download("data.csv", "data.csv", (err) => {
          if (err) {
            console.error("Error sending CSV file:", err);
            res.status(500).send("Internal Server Error");
          }

          // Delete the CSV file after it has been sent
          fs.unlink("data.csv", (err) => {
            if (err) {
              console.error("Error deleting CSV file:", err);
            }
          });
        });
      })
      .catch((err) => {
        console.error("Error creating CSV file:", err);
        res.status(500).send("Internal Server Error");
      });
  }

  if (type === "json") {
    // Set response headers
    res.setHeader("Content-Disposition", "attachment; filename=data.json");
    res.setHeader("Content-Type", "application/json");

    // Send the JSON file as the response
    res.json(data);
  }

  if (type === "xls") {
    const copyData = JSON.parse(JSON.stringify(data));
    // Create a new workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(copyData);

    // Add the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate the Excel file buffer
    const buffer = xlsx.write(workbook, { bookType: "xls", type: "buffer" });

    // Set the appropriate headers for the response
    res.setHeader("Content-Disposition", "attachment; filename=data.xls");
    res.setHeader("Content-Type", "application/vnd.ms-excel");
    res.setHeader("Content-Length", buffer.length);

    // Send the buffer as the response
    res.send(buffer);
  }
});

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/import", upload.single("file"), async (req, res) => {
  const file = req.file;
  let jsonData;

  if (file.mimetype.includes("json")) {
    jsonData = JSON.parse(file.buffer.toString());
  }

  if (file.mimetype.includes("csv")) {
    jsonData = parseCsv(file.buffer);
  }

  if (file.mimetype.includes("excel")) {
    jsonData = parseXls(file.buffer);
  }

  Site.insertMany(jsonData)
    .then((result) => {
      console.log("Saved successfully.");
      res.status(201).json({ message: "Data saved successfully" });
    })
    .catch((error) => {
      console.error("Error saving:", error);
      res
        .status(500)
        .json({ error: "An error occurred while saving the data" });
    });
});

module.exports = router;
