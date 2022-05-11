const { Schema, model } = require("mongoose");

const spiritualSchema = new Schema({
  book: {
    type: String,
    enum: ["bible", "quran", "torah"],
  },
  verses: {
    type: String,
    required: true,
  },
  takeaway: {
    type: String,
    required: true,
  },
});

const Spiritual = model("Spiritual", spiritualSchema);

module.exports = Spiritual;