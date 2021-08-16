const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  googlelogin: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user) {
        return res.json({ isExists: false });
      } else {
        const refreshtoken = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refreshtoken, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
        });
        console.log({ user });

        return res.json({
          isExists: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  createprofile: async (req, res) => {
    try {
      const { fullname, age, gender, mobileno, email, password_repeat } =
        req.body;
      const passwordHash = await bcrypt.hash(password_repeat, 12);

      const newUser = new Users({
        fullname,
        age,
        gender,
        mobileno,
        email,
        password_repeat: passwordHash,
      });
      newUser.save();

      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
      });
      

      console.log(newUser);

      res.json({ refreshtoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refresh_Token: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) {
        return res.status(400).json({ msg: "please complete profile" });
      }

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(400).json({ msg: "Please complete profile" });
        }

        res.json({ user, rf_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrl;
