require("dotenv").config();
require("./db/mongoose");

const { Configuration, OpenAIApi } = require("openai");
const path = require("path");
const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cheerio = require("cheerio");
const fs = require("fs");
const puppeteer = require('puppeteer');

const siteRouter = require("./db/routers/site");
const Site = require("./db/models/site");

const app = express();

const PORT = process.env.PORT || process.env.STATIC_PORT;

app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

app.use(siteRouter);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion(search) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `запропонуй 5 книг за цим запросом і поверни їх у вигляді json об'єкту з свойствами автор, назва, короткий опис "${search}"`,
    maxTokens: 100,
    temperature: 0.5,
    n: 1,
    stop: "\n",
  });
  console.log(completion.data.choices[0].text);
}

app.post("/search", async (req, res) => {
  const { search } = req.body;
  // console.log(req.body)

  // ai search parsed result from json (JSON.parse(result)
  // const parsedResult = [
  //   { title: "Будинок біля озера", author: "Кейт Мортон" },
  //   { title: "Хата на болоті", author: "Пола Хоукінс" },
  //   { title: "Тіні на озері", author: "Сімон Бекер" },
  //   { title: "Під озером", author: "Стівен Шушкевич" },
  //   { title: "Смерть у Відні", author: "Фрідріх Дюрренматт" },
  // ];
  // console.log(parsedResult);

  //пошук
  // 1) https://yakaboo.ua
  // 2) https://book-ye.com.ua/
  // 3) https://bookclub.ua/

  // 4) https://bookovka.ua/uk
  // 5) https://book24.ua/ua/
  // 6) https://booklya.ua/

  const sites = await Site.find({});

  const results = [];

  // const browser = await puppeteer.launch();

  try {
    async function fetchSearchResults(searchTerm, site) {
      try {
        // const page = await browser.newPage();
        // await page.goto(`${site.siteSearchUrl}${searchTerm}`);

        // await page.waitForFunction(() => {
        //   return document.readyState === 'complete';
        // });

        // const html = await page.content();
        // const $ = cheerio.load(html);

        const response = await fetch(`${site.siteSearchUrl}${searchTerm}`);
        const data = await response.text();
        const $ = cheerio.load(data);

        // const html = $.html();
        // fs.writeFile(`${site.siteName}.html`, html, (err) => {
        //   if (err) {
        //     console.error(err);
        //   } else {
        //     console.log("Page saved!");
        //   }
        // });

        // if ($("body").length > 0) {
        //   console.log("Page loaded successfully");
        // } else {
        //   console.log("Page did not load properly");
        // }

        const parent = $(site.containerSelector);
        const card = parent.children(site.itemSelector).first();

        const image = $(card).find(site.imageSelector).attr("src");
        const title = $(card).find(site.titleSelector).text();
        const author = $(card).find(site.authorSelector).text();
        const price = $(card).find(site.priceSelector).text();
        const available = $(card).find(site.availabelSelector).text();
        const bookUrl = $(card).find(site.bookUrlSelector).attr("href");

        const parsePrice = (string) => {
          return string.replace(/ /g, "").replace(".", "").replace("грн", "");
        };

        if (Boolean(title)) {
          results.push({
            source: site.siteName,
            image: image?.includes("http") ? image : `${site.siteUrl}${image}`,
            title,
            author,
            price: parsePrice(price),
            available,
            bookUrl: bookUrl?.includes("http")
              ? bookUrl
              : `${site.siteUrl}${bookUrl}`,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    async function startSearch() {
      for (let i = 0; i < sites.length; i++) {
        await fetchSearchResults(search, sites[i]);
      }
    }

    
    await startSearch();

    // await browser.close();

    res.status(200).send({ results });
  } catch (e) {
    res.status(500).send();
  }
});

if (process.env.MODE === "production" && !__dirname.includes("http")) {
  const dir = __dirname.replace("server", "client");
  app.use(express.static(path.join(dir, "build")));

  app.get("/*", function (req, res) {
    res.sendFile(path.join(dir, "build", "index.html"));
  });
}

if (process.env.MODE === "production" && __dirname.includes("http")) {
  const dir = __dirname;
  app.use(express.static(path.join(dir, "build")));

  app.get("/*", function (req, res) {
    res.sendFile(path.join(dir, "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
