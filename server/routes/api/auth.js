const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { validationResult } = require("express-validator");
const User = require("../../models/User");
const Story = require("../../models/Story");
const config = require("config");

/**
 * @route POST api/auth/register
 * @desc Register the User
 * @access Public
 */
router.post("/register", async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Bad data",
      });
    }

    const { name, username, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
      return res.status(400).json({
        msg: "Password do not match.",
      });
    }
    // Check for the unique Username
    const candidateUniqueUsername = await User.findOne({
      username: username,
    });
    if (candidateUniqueUsername) {
      return res.status(400).json({
        msg: "Username is already taken.",
      });
    }
    // Check for the Unique Email
    const candidateUniqueEmail = await User.findOne({
      email: email,
    });
    if (candidateUniqueEmail) {
      return res.status(400).json({
        msg: "Email is already registred. Did you forgot your password.",
      });
    }
    // The data is valid and new we can register the user
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      username,
      password: hashedPassword,
      email,
    });
    await user.save();

    // function randomString() {
    //   let alphabet = "qwertyuiopasdfghjklzxcvbnm",
    //     word = "";
    //   for (let i = 0; i < 6; i++) {
    //     word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
    //   }
    //   return word;
    // }
    // const text = randomString();

    res.status(201).json({ message: "User is created!!!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
});

/**
 * @route POST api/auth/login
 * @desc Login the User
 * @access Public
 */

router.post("/login", async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Bad data",
      });
    }

    const { username, password } = req.body;
    console.log("login req.body", req.body);

    const user = await User.findOne({ username });
    console.log("login user founded", user, "uraaaaaaaaaAAAAAAA");

    if (!user) {
      return res.status(400).json({ message: "Username is not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
      config.get("jwtSecret"),
      {
        expiresIn: "1h",
      },
      (err, token) => {
        res.status(200).json({
          success: true,
          token: `Bearer ${token}`,
          user: user,
          msg: "Hurry! You are now logged in.",
        });
      }
    );
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @route GET api/users/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    // const user = await User.findOne({ username });
    const stories = await Story.find({ author: req.user._id });
    console.log("req.user", req.user);
    return res.json({
      user: req.user,
      stories: stories,
    });
  }
);
/**
 * @route POST api/users/profile
 * @desc Return the User's Data
 * @access Public
 */
router.post("/profile", async (req, res) => {
  const { username, title } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: "Username is not found" });
  }
  const story = new Story({
    author: user._id,
    title,
  });
  await story.save();
  const stories = await Story.find({ author: user._id });
  res.status(201).json({
    message: "story is created!!!",
    success: true,
    story: story,
    stories: stories,
  });
});

module.exports = router;
