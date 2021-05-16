const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const passport = require("passport");

// Initialize the app
const app = express();

// Middlewares
// Form Data Middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Json Body Middleware

app.use(bodyParser.json());

// Cors Middleware
app.use(cors());

// Seting up the static directory
app.use(express.static(path.join(__dirname, "public")));

// Use the passport Middleware
app.use(passport.initialize());
// Bring in the Passport Strategy
require("./config/passport.config")(passport);

const PORT = config.get("port") || 5001;
console.log(config.get("mongoUrl"));
async function start() {
  try {
    await mongoose.connect(config.get("mongoUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`app has been started on port ${PORT}`);
    });
    app.use("/api/auth", require("./routes/api/auth"));
  } catch (error) {
    console.log(`Server Error: ${error.message}`);
    process.exit(1);
  }
}

start();
