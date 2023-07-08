const jwt = require("jsonwebtoken");
const User = require("../db/models/user");

const protectedRoutes = ["/logout", "/site", "/book", "/user", "/export", "/import"];

const auth = async (req, res, next) => {
  if (protectedRoutes.includes(req.path)) {
    try {
      const token = req.cookies.jwttoken;
      const decoded = jwt.verify(token, process.env.SECRET_ENCODE_PHRASE);
      const user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });

      if (!user) {
        throw new Error();
      }

      req.token = token;
      req.user = user;

      next();
    } catch (e) {
      res.status(401).send({ error: "Please authenticate." });
    }
  } else {
    next();
  }
};

module.exports = auth;
