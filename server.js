require('dotenv').config()
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = 3000;
const DBUSER = process.env.DB_USER;
const DBPASS = process.env.DB_PASS;
const DBHOST = process.env.DB_HOST;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://"+DBUSER+":"+DBPASS+"@"+DBHOST+"/workout?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});