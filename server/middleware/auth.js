const jwt = require("jsonwebtoken");
const User = require("../db/models/user");

const auth = async (req, res, next) => {
  if (req.path === '/logout') {
    try {
      console.log('start checking')
      console.log(req.cookies)
      const token = req.cookies.jwttoken;
      const decoded = jwt.verify(token, process.env.SECRET_ENCODE_PHRASE);
      console.log(decoded)
      const user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });
      console.log(user)
      if (!user) {
        throw new Error();
      }

      req.token = token
      req.user = user

      next();
    } catch (e) {
      res.status(401).send({ error: "Please authenticate." });
    }
  } else {
    next();
  }
};

module.exports = auth;
