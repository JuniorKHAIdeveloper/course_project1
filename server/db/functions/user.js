const User = require("../models/user");

const initAdminUser = async () => {
  // move to env
  const credentials = {
    email: process.env.ADMIN_LOGIN,
    password: process.env.ADMIN_PASSWORD,
    role: "admin",
  };

  try {
    const admin = await User.find({ email: credentials.email });
    if (!admin?.length) {
      const initAdmin = new User(credentials);
      await initAdmin.save();
      console.log("admin account is created!");
    }
  } catch (e) {
    console.log(e);
  }
};

const createNewUser = async (login, password) => {
  // move to env
  const credentials = {
    email: login,
    password: password,
  };

  // check if user exist already
  try {
    const newUser = new User(credentials);
    await newUser.save();
  } catch (e) {
    console.log(e);
  }
};

module.exports = {initAdminUser, createNewUser};
