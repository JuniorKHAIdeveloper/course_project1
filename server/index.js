require("dotenv").config();
require("./db/mongoose");

const { Configuration, OpenAIApi } = require("openai");
const path = require("path");
const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cheerio = require("cheerio");

const siteRouter = require('./db/routers/site')
const Site = require("./db/models/site");

const app = express();

const PORT = process.env.PORT || process.env.STATIC_PORT;

app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

app.use(siteRouter)

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

  try {
    await fetch(`${sites[1].siteSearchUrl}${search}`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        const $ = cheerio.load(data);

        const parent = $(sites[1].containerSelector);
        const card = parent.children(sites[1].itemSelector).first();

        const image = $(card).find(sites[1].imageSelector).first().attr("src");
        const title = $(card).find(sites[1].titleSelector).first().text();
        const author = $(card).find(sites[1].authorSelector).first().text();
        const price = $(card).find(sites[1].priceSelector).first().text();
        const availabel = $(card).find(sites[1].availabelSelector).first().text();

        results.push({
          source: sites[1].siteName,
          image,
          title,
          author,
          price,
          availabel,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    // await fetch(
    //   `https://www.bookovka.ua/uk/search?orderby=position&orderway=desc&search_query=${search}`
    // )
    //   .then((response) => {
    //     return response.text();
    //   })
    //   .then((data) => {
    //     const $ = cheerio.load(data);

    //     const parent = $("ul.product_list");
    //     const card = parent.children().first();

    //     // const image = $(this).attr('src');
    //     const image = $(card).find("img").first().attr("src");
    //     const title = $(card).find("a.product-name").first().text();
    //     const price = $(card).find("span.product-price").first().text();
    //     const availabel = $(card).find("span.stock_label").first().text();

    //     results.push({
    //       source: 'bookovka.ua',
    //       image,
    //       title,
    //       author: "",
    //       price,
    //       availabel,
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    //   await fetch(
    //     `https://book24.ua/ua/catalog/?q=${search}`
    //   )
    //     .then((response) => {
    //       return response.text();
    //     })
    //     .then((data) => {
    //       const $ = cheerio.load(data);
  
    //       const parent = $("div.catalog_block");
    //       const card = parent.children("div.item").first();
          
    //       // const image = $(this).attr('src');
    //       const image = $(card).find("span.section-gallery-wrapper__item _active img").attr("src");
    //       const title = $(card).find("div.item-title").first().text();
    //       const author = $(card).find("div.article_block").first().text();
    //       const price = $(card).find("span.values_wrapper").first().text();
    //       const availabel = $(card).find("div.item-stock").first().text();
  
    //       results.push({
    //         source: 'book24.ua',
    //         image,
    //         title,
    //         author,
    //         price,
    //         availabel,
    //       });
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });

    //   await fetch(
    //     `https://www.booklya.ua/search/?q=${search}`
    //   )
    //     .then((response) => {
    //       return response.text();
    //     })
    //     .then((data) => {
    //       const $ = cheerio.load(data);
  
    //       const parent = $("div.goodsContainer");
    //       const card = parent.children("div.goodsItem").first();
          
    //       // const image = $(this).attr('src');
    //       const image = $(card).find("img").first().attr("src");
    //       const title = $(card).find("a.goodsItem-t").first().text();
    //       const author = $(card).find("span.MB_authorName").first().text();
    //       const price = $(card).find("div.goodsItem-ba-SinglePrice").first().text();
    //       // const availabel = $(card).find("div.item-stock").first().text();
  
    //       results.push({
    //         source: 'booklya.ua',
    //         image,
    //         title,
    //         author,
    //         price,
    //         availabel: '',
    //       });
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });

    //   await fetch(
    //     `https://www.yakaboo.ua/ua/search?q=${search}`
    //   )
    //     .then((response) => {
    //       return response.text();
    //     })
    //     .then((data) => {
    //       const $ = cheerio.load(data);
  
    //       const parent = $("div.products-wrap");
    //       const card = parent.children("div.product").first();
          
    //       // const image = $(this).attr('src');
    //       const image = $(card).find("img.product__media").first().attr("src");
    //       const title = $(card).find("a.product__name").first().text();
    //       const author = $(card).find("div.product__author").first().text();
    //       const price = $(card).find("div.product__price-current").first().text();
    //       const availabel = $(card).find("div.product__btn-text").first().text();
  
    //       results.push({
    //         source: 'book-ye.com.ua',
    //         image,
    //         title,
    //         author,
    //         price,
    //         availabel,
    //       });
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });

    //   await fetch(
    //     `https://bookclub.ua/#/search/${search}`
    //   )
    //     .then((response) => {
    //       return response.text();
    //     })
    //     .then((data) => {
    //       const $ = cheerio.load(data);
  
    //       const parent = $("div.multi-lists");
    //       console.log(parent.length)
    //       const card = parent.children("div.multi-cell").first();
    //       console.log(card.length)
    //       // const image = $(this).attr('src');
    //       const image = $(card).find("img").first().attr("src");
    //       const title = $(card).find("div.multi-content").first().text();
    //       const author = $(card).find("div.product__author").first().text();
    //       const price = $(card).find("span.multi-price").first().text();
    //       const availabel = $(card).find("div.product__btn-text").first().text();
  
    //       results.push({
    //         source: 'bookclub.ua',
    //         image,
    //         title,
    //         author: '',
    //         price,
    //         availabel: '',
    //       });
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });

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
