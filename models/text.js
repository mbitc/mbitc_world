const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TextSchema = new Schema({
  email: {
    type: String,
    require: true
  },
  text: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("texts", TextSchema);
