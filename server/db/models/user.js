const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  books: [
    {
      source: {
        type: String,
      },
      image: {
        type: String,
      },
      title: {
        type: String,
      },
      author: {
        type: String,
      },
      price: {
        type: String,
      },
      available: {
        type: String,
      },
      bookUrl: {
        type: String,
      },
    },
  ],
  role: {
    type: String,
    default: "user",
  },
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.SECRET_ENCODE_PHRASE
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

userSchema.statics.checkDuplicate = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new Error("User already exist");
  }
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
