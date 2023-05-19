const express = require("express");
const auth = require("../../middleware/auth");
const { createNewUser } = require("../functions/user");
const User = require("../models/user");
const router = new express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    // check if user exist then generate token

    const token = await user.generateAuthToken();
    // rename
    res.cookie("jwttoken", token);
    res.status(200).send({ role: user.role, userId: user.id });
    // .redirect('/admin');
    // redirect
  } catch (e) {
    console.log(e)
    res.status(400).send();
  }
});

router.post("/registration", async (req, res) => {
  try {
    await createNewUser(req.body.email, req.body.password);
    res.status(200).send();
    // .redirect('/admin');
    // redirect
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/logout", async (req, res) => {
  try {
    console.log(req.user);
    req.user.tokens = req.user.tokens.filter((token) => {
      console.log(token.token);
      return token.token !== req.token;
    });
    res.cookie("jwttoken", "");
    await req.user.save();

    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.put("/book", async (req, res) => {
  try {
    const { userId, book } = req.body;
    console.log(userId);
    const { books = [] } = await User.findOne({ _id: userId });

    // move to functions
    const hasObjectWithSameBookUrl = (array, bookUrl) => {
      return array.some((obj) => obj.bookUrl === bookUrl);
    };

    // move to functions
    const filterArrayExcludeBookWithSameBookUrl = (array, bookUrl) => {
      return array.filter((item) => item.bookUrl !== bookUrl);
    };

    if (!hasObjectWithSameBookUrl(books, book.bookUrl)) {
      books.push(book);
      await User.updateOne({ _id: userId }, { books });
    } else {
      const updatedArray = filterArrayExcludeBookWithSameBookUrl(books, book.bookUrl);
      await User.updateOne({ _id: userId }, { books: updatedArray });
    }

    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/user", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });

    res.status(200).send({login: user.email, books: user.books});
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/user", async (req, res) => {
  try {
    const { userId } = req.body;
    await User.deleteOne({ _id: userId });

    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
