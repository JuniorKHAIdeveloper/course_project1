require("dotenv").config();
require("./db/mongoose");

const path = require("path");
const express = require("express");
const cookieParser = require('cookie-parser');

const { initAdminUser} = require('./db/functions/user');
const auth = require('./middleware/auth');
const userRouter = require('./db/routers/user')
const siteRouter = require("./db/routers/site");
const parserRouter = require("./db/routers/parser");

const app = express();

const PORT = process.env.PORT || process.env.STATIC_PORT;

app.use(cookieParser());
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

app.use(auth)
app.use(userRouter)
app.use(siteRouter);
app.use(parserRouter);

initAdminUser();

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
  console.log(`server - listening on ${PORT}`);
});
