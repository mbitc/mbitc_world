const express = require("express");
const router = express.Router();

// Text Model
const Text = require("../models/text");

// Method use
router.use(function (req, res, next) {
  if (req.query._method === "DELETE") {
    req.method = "DELETE";
    req.url = req.path;
  }
  next();
});

router.use(function (req, res, next) {
  if (req.query._method === "PUT") {
    req.method = "PUT";
    req.url = req.path;
  }
  next();
});

// @route   GET api/text
// @desc    Get All Text
// @access  Public
router.get("/", async (req, res) => {
  try {
    var posts = await Text.find();
    res.render("pages/text", {
      eventData: posts
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

// @route   POST api/text
// @desc    Create An Text
// @access  Private
router.post("/", async (req, res) => {
  const newText = new Text({
    email: req.body.email,
    text: req.body.text
  });

  newText.save();
  try {
    var posts = await Text.find();
    res.render("pages/text", {
      eventData: posts
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

// @route   DELETE data/text/:id
// @desc    Delete A Text
// @access  Private
router.delete("/:id", async (req, res) => {
  Text.deleteOne(
    {
      _id: req.params.id
    },
    async (err, eventData) => {
      if (err) return console.error(err);

      try {
        var posts = await Text.find();
        res.render("pages/text", {
          eventData: posts
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("error");
      }
    }
  );
});

// @route   PUT data/text/:id
// @desc    PUT A Text
// @access  Private
router.put("/:id", function (req, res) {
  Text.updateOne(
    {
      _id: req.params.id
    },
    function (err, user) {
      if (err) return console.error(err);

      console.log("Message successfully removed!");
      try {
        var posts = Text.find();
        res.render("pages/text", {
          eventData: posts
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("error");
      }
    }
  );
});

module.exports = router;
