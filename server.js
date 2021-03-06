const express = require("express");
const parser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Connect to Mongo
mongoose
  .connect(
    "mongodb+srv://mb_user:gerumas11@cluster0.prys4.mongodb.net/Cluster0?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Use Routes
app.use("/text", require("./data/text"));

// Page Renders
app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/contacts", function (req, res) {
  res.render("pages/contacts");
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server started on port ${port}`));
